import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../config/prisma'

interface User {
    name: string
    email: string
    password: string
    role_code: string
}
export const register = async (data: User) => {
    // Tìm xem user đã tồn tại chưa
    const userExist = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    })
    if (userExist) {
        return {
            error: 1,
            message: 'User already exists',
        }
    }
    // Mã hóa mật khẩu
    const salt: number = Number.parseInt(process.env.SALT || '10')
    const hashPassword = await bcrypt.hash(data.password, salt)
    // Tạo user mới
    return await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashPassword,
            role_code: data.role_code,
        },
    })
}

export const login = async (email: string, password: string) => {
    // Tìm user theo email
    const userExist = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })
    if (!userExist) {
        return {
            error: 1,
            message: 'User not found',
        }
    }
    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, userExist.password)
    const JWT_SECRET = process.env.JWT_SECRET || 'love_NodeJS'
    console.log(process.env.JWT_SECRET)
    if (isMatch) {
        let token = jwt.sign(
            { id: userExist.id, email: userExist.email, role_code: userExist.role_code },
            JWT_SECRET,
            { expiresIn: '3 Days' }
        )
        return {
            ...userExist,
            password: 'hidden',
            token: token,
        }
    } else {
        return {
            error: 1,
            message: 'Password or Email is incorrect',
        }
    }
}
