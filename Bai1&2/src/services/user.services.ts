import prisma from "../config/prisma"

interface User {
    name: string,
    email: string,
    age: number,
    address: string | null
}

export const getAllUsers = async () => {
    return await prisma.user.findMany()
}

export const getUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: {
            id: id
        }
    })
}

export const createUser = async (data: User) => {
  return await prisma.user.create({
    data: data
  });
};

export const updateUser = async (id: number, data: User) => {
    return await prisma.user.update({
        where: {
        id: id
        },
        data: data
    });
}

export const deleteUser = async (id: number) => {
    return await prisma.user.delete({
        where: {
            id: id
        }
    })
}