import { Shopping } from 'src/types/shopping'
import prisma from '../config/prisma'

export const createShopping = async (data: Shopping) => {
    return await prisma.shopping.create({
        data: data,
    })
}
