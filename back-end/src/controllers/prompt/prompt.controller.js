import { createPrompt, deletePrompt, getPromptById, getPromptByUserId, requestDescriptionOpenAi, requestOpenAi, requestTagOpenAi, updatePrompt } from "../../services/prompt.service";
import { createSchema, getByIdSchema } from "./prompt.validation";

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