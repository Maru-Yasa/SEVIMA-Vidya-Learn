import config from "../config"
import { openai } from "../libs/openai"
import prisma from "../libs/prisma"

export const createPrompt = async (data) => {
    const newPrompt = await prisma.prompt.create({
        data: {...data}
    })
    return newPrompt
}

export const updatePrompt = async (id, data) => {
    try {
        const prompt = await prisma.prompt.update({
            where: {
                id: id
            },
            data: {...data}
        })
        return prompt
    } catch (error) {
        return error
    }
}

export const getAllPrompt = async () => {
    const prompts = await prisma.prompt.findMany({});
    return prompts
}

export const getPromptById = async (id) => {
    const prompt = await prisma.prompt.findUnique({
        where: {
            id: id
        }
    })

    return prompt
}

export const getPromptByUserId = async (id) => {
    const prompts = await prisma.prompt.findMany({
        where: {
            idUser: id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return prompts
}

export const requestDescriptionOpenAi = async (question) => {
    try {
        const response = await openai.createCompletion({
            model: "text-curie-001",
            prompt: `
                Task:  Ringkas ini untuk kelas dua
                Topic: ${question}
                Style: Akademik
                Tone: bahagia
                Format: Text
            `,
            temperature: 1,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        return response.data.choices[0].text
    } catch (error) {
        return error
    }
}

export const requestTagOpenAi = async (topic) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `
            Task: dari text dibawah, sebutkan jenis pelajaran dalam satu kata sebagai hastag menggunakan bahasa indonesia
            Topic: ${topic}
            Length: one word
            Format: tag
            `,
            temperature: 1,
            max_tokens: 10,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        return response.data.choices[0].text
    } catch (error) {
        return error
    }
}

export const requestOpenAi = async (question) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `
            Task: jelaskan materi pembelajaran dan berikan materi lebih lanjut melalui url yang valid
            Topic: ${question}
            Style: Academic
            Tone: Bahagia
            Length: 3 paragraphs or more
            Format: HTML tags with h2 for title p for paragraph and li for url list and also a for link
            `,
            temperature: 1,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        return response.data.choices[0].text
    } catch (error) {
        return error
    }
}

export const deletePrompt = async (id) => {
    try {
        const response = await prisma.prompt.delete({
            where: {
                id: id
            }
        })
        return response
    } catch (error) {
        return error
    }
}