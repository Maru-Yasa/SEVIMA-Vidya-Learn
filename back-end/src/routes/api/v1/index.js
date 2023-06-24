import { Router } from "express";
import AuthRoute from './auth/index'
const route = Router()

route.use('/auth', AuthRoute);

route.get('/', (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Hello world',
        data: {}
    })
})



export default route;