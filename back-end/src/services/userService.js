import config from '../config';
import prisma from '../libs/prisma';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUser = async (username, email, name, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {username, email, name, password: hashedPassword}
    })
    return user
}

export const loginUser = async (username, password) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (!bcrypt.compareSync(password, user.password)) {
            return {
                status: false,
                message: "Username or password invalid",
                data: {}
            }
        }

        const token = jwt.sign({ id: user.id, name: user.name, username: user.username, email: user.email }, config.SECRET);
        return {
            status: true,
            message: "Success login",
            data: {
                token,
                type: 'Bearer'
            }
        }

    } catch (error) {
        return {
            status: false,
            message: "User not found"
        }
    }
}