import config from '../config';
import prisma from '../libs/prisma';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {...data, password: hashedPassword}
    })
    return user
}

export const loginUser = async ({email, password}) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!bcrypt.compareSync(password, user.password)) {
            return {
                status: false,
                message: "Email atau password salah",
                data: {}
            }
        }

        const token = jwt.sign({ id: user.id, nama: user.nama, email: user.email, jenisKelamin: user.jenisKelamin, idSekolah: user.idSekolah, role: user.role }, config.SECRET);
        return {
            status: true,
            message: "Login berhasil",
            data: {
                token,
                type: 'Bearer'
            }
        }

    } catch (error) {
        return {
            status: false,
            message: "Email atau password salah"
        }
    }
}

export const getToken = async (user) => {
    const token = jwt.sign({ id: user.id, nama: user.nama, email: user.email, idSekolah: user.idSekolah, role: user.role }, config.SECRET);
    return {
        token,
        type: 'Bearer'
    }
}

export const updateProfile = async (id, data) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {...data}
        })
        return user
    } catch (error) {
        console.log(error);
        return error
    }
}