import { Router } from "express";
import AuthRoute from './auth/index'
import PromptRoute from './prompt/prompt.route'
const route = Router()

route.use('/auth', AuthRoute);
route.use('/prompt', PromptRoute);

route.get('/', (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Hello world',
        data: {}
    })
})



export default route;