import prisma from "../libs/prisma";

export const isEmailUsed = async (data) => {
    
    const isExist = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    })

    return isExist
}
