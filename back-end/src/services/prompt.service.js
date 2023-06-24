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
        }
    })

    return prompts
}

export const requestOpenAi = async (question) => {
    try {
        console.log(config);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `
                Task:  jelaskan materi pembelajaran dan berikan materi lebih lanjut melalui url
                Topic: ${question}
                Style: Akademik
                Tone: bahagia
                Format: MDX
            `,
            temperature: 1,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        console.log(response.data.choices[0]);
        return response.data.choices[0].text
    } catch (error) {
        return error
    }
}