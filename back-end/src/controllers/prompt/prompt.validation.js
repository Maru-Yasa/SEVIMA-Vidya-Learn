import { join } from "@prisma/client/runtime";
import Joi from "joi";

export const createSchema = Joi.object({
    question: Joi.string()
        .required()
        .min(5)
}).messages({
    "any.required": "Data harus dilengkapi",
    "any.min": "Panjang data minimal {#limit}",
    "string.email": "Data email harus valid"
})

export const getByIdSchema = Joi.object({
    id: Joi.string()
        .required()
}).messages({
    "any.required": "Data harus dilengkapi",
    "any.min": "Panjang data minimal {#limit}",
    "string.email": "Data email harus valid"
})