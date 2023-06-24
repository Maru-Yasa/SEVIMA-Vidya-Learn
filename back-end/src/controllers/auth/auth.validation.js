import Joi from "joi";

const requiredMessage = "Data harus dilengkapi"

export const registerSchema = Joi.object({
    nama: Joi.string()
        .min(3)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
    jenjangSekolah: Joi.string()
        .required(),
    idSekolah: Joi.string()
        .required(),
    idProvinsi: Joi.string()
        .required(),
    idKabupaten: Joi.string()
        .required(),
    jenisKelamin: Joi.string()
        .required(),
    role: Joi.string()
    
}).messages({
    "any.required": "Data harus dilengkapi",
    "any.min": "Panjang data minimal {#limit}",
    "string.email": "Data email harus valid"
})

export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
    .required()
    
}).messages({
    "any.required": "Data harus dilengkapi",
    "any.min": "Panjang data minimal {#limit}",
    "string.email": "Data email harus valid"
})

export const updateProfileSchema = Joi.object({
    email: Joi.string()
        .email(),
    nama: Joi.string()
        .min(3),
    password: Joi.string()
        .min(6),
}).messages({
    "any.required": "Data harus dilengkapi",
    "any.min": "Panjang data minimal {#limit}",
    "string.email": "Data email harus valid"
}).unknown(true)