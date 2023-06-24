import { createPrompt, getPromptById, getPromptByUserId, requestOpenAi, updatePrompt } from "../../services/prompt.service";
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
    const response = await requestOpenAi(prompt.question)
    const newPrompt = await updatePrompt(prompt.id, {
        answer: response
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
    console.log(data);
    const prompt = await getPromptById(data.id)
    return res.status(200).json({
        status: true,
        message: 'Berhasil mendapatkan prompt',
        data: prompt
    })
}

export const updateItem = () => {

}

export const deleteItem = () => {

}