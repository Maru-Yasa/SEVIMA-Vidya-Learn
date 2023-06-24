import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required(),
    username: Joi.string()
        .min(3)
        .alphanum(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .required()
})

export const loginSchema = Joi.object({
    username: Joi.string()
        .required(),
    password: Joi.string()
    .required()
})