import prisma from '../config/prisma'

interface User {
    email: string
    name: string
    password: string
    point: number
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

export const updateUser = async (id: number, data: Partial<User>) => {
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

export const getTopUsers = async () => {
    return await prisma.user.findMany({
        orderBy: { point: 'desc' },
        take: 10,
        select: {
            id: true,
            name: true,
            email: true,
            point: true,
        },
    })
}

export const updateTopUsers = async (users: { id: number; point: number }[]) => {
    const updatePromises = users.map((user) => {
        return prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                point: user.point,
            },
        })
    })
    return await Promise.all(updatePromises)
}
