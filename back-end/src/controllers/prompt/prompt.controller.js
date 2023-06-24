import prisma from "../../libs/prisma";
import { createPrompt, deletePrompt, getPromptById, getPromptByUserId, requestDescriptionOpenAi, requestOpenAi, requestTagOpenAi, updatePrompt } from "../../services/prompt.service";
import { createSchema, getByIdSchema, getTrendSchema } from "./prompt.validation";
import dayjs from 'dayjs'
export const createItem = async (req, res) => {
    const validator = createSchema.validate(req.body)
    const data = validator.value
    if (validator.error) {
        return res.status(400).json({
            status: false,
            message: 'Data kurang atau tidak tepat, mohon dilengkapi',
            errors: validator.error.details
        }); 
    }

    const prompt = await createPrompt({...data, idSekolah: req.user.idSekolah, idUser: req.user.id})
    // TODO: integrasi ke OpenAi API
    const answer = await requestOpenAi(prompt.question)
    const description = await requestDescriptionOpenAi(prompt.question)
    const tag = await requestTagOpenAi(description)
    console.log(tag);
    const newPrompt = await updatePrompt(prompt.id, {
        answer: answer,
        description: description,
        tag: tag
    })
    return res.status(200).json({
        status: true,
        message: 'Berhasil membuat prompt',
        data: {
            newPrompt    
        }
    })
}

export const getAllItem = () => {

}

export const getItemByUserId = async (req, res) => {
    const prompt = await getPromptByUserId(req.user.id)
    return res.status(200).json({
        status: true,
        message: 'Berhasil mendapatkan prompt',
        data: prompt
    })
}

export const getItemById = async (req, res) => {
    const validator = getByIdSchema.validate(req.params)
    const data = req.params
    if (validator.error) {
        return res.status(400).json({
            status: false,
            message: 'Data kurang atau tidak tepat, mohon dilengkapi',
            errors: validator.error.details
        }); 
    }
    const prompt = await getPromptById(data.id)
    return res.status(200).json({
        status: true,
        message: 'Berhasil mendapatkan prompt',
        data: prompt
    })
}

export const updateItem = () => {

}

export const deleteItem = async (req, res) => {
    const validator = getByIdSchema.validate(req.params)
    const data = req.params
    if (validator.error) {
        return res.status(400).json({
            status: false,
            message: 'Data kurang atau tidak tepat, mohon dilengkapi',
            errors: validator.error.details
        }); 
    }
    await deletePrompt(data.id);
    return res.status(200).json({
        status: true,
        message: 'Berhasil menghapus prompt',
        data: {}
    })
}

export const getTrend = async (req, res) => {
    const validator = getTrendSchema.validate(req.query)
    const data = req.query
    if (validator.error) {
        return res.status(400).json({
            status: false,
            message: 'Data kurang atau tidak tepat, mohon dilengkapi',
            errors: validator.error.details
        }); 
    }

    const prompt = await prisma.prompt.groupBy({
        by: ["tag"],
        take: 5,
        where: {
            idSekolah: data.npsn
        },
        _count: {
            tag: true
        },
        orderBy: { _count: { tag: 'desc' } }
    })

    return res.json({
        status: true,
        data: prompt
    })

}

export const getAnalyticUses = async (req, res) => {
    const validator = getTrendSchema.validate(req.query)
    const data = req.query
    if (validator.error) {
        return res.status(400).json({
            status: false,
            message: 'Data kurang atau tidak tepat, mohon dilengkapi',
            errors: validator.error.details
        }); 
    }

    let prompt = await prisma.prompt.findMany({
        where: {
            idSekolah: data.npsn
        }
    })

    let mappedPrompt = {}
    let ranges = []

    for (let i = 0; i < 8; i++) {
        const date = dayjs().subtract(7, 'days').add(i, 'day').format('DD-MM-YY');
        ranges.push(date);
    }

    ranges.map((date) => {
        mappedPrompt[date] = {
            name:date,
            value: 0
        }
    })

    prompt.map((data) => {
        let date = dayjs(data.createdAt).format('DD-MM-YY')
        if (mappedPrompt[date]) {
            mappedPrompt[date].value += 1        
        }
    })

    return res.json({
        status: true,
        data: mappedPrompt
    })

}

export const getSelfAnalyticUses = async (req, res) => {
    if (validator.error) {
        return res.status(400).json({
            status: false,
            message: 'Data kurang atau tidak tepat, mohon dilengkapi',
            errors: validator.error.details
        }); 
    }

    let prompt = await prisma.prompt.findMany({
        where: {
            idUser: req.user.id
        }
    })

    let mappedPrompt = {}
    let ranges = []

    for (let i = 0; i < 8; i++) {
        const date = dayjs().subtract(7, 'days').add(i, 'day').format('DD-MM-YY');
        ranges.push(date);
    }

    ranges.map((date) => {
        mappedPrompt[date] = {
            name:date,
            value: 0
        }
    })

    prompt.map((data) => {
        let date = dayjs(data.createdAt).format('DD-MM-YY')
        if (mappedPrompt[date]) {
            mappedPrompt[date].value += 1        
        }
    })

    return res.json({
        status: true,
        data: mappedPrompt
    })

}

export const getAnalytic = async (req, res) => {
    
}