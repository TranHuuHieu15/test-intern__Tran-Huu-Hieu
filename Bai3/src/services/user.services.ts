import prisma from '../config/prisma'

interface User {
    email: string
    name: string
    password: string
    role_code: string
}

export const getAllUsers = async () => {
    return await prisma.user.findMany()
}

export const getUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: {
            id: id,
        },
    })
}

export const updateUser = async (id: number, data: User) => {
    return await prisma.user.update({
        where: {
            id: id,
        },
        data: data,
    })
}

export const deleteUser = async (id: number) => {
    return await prisma.user.delete({
        where: {
            id: id,
        },
    })
}
