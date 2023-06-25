import express from 'express'
import config from './config'
import { response } from './helper/response'
import ApiRoute from './routes/api/v1'
import cors from 'cors'
import morgan from 'morgan'
const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/v1', ApiRoute);

app.use('*', (req, res) => {
    res.status(404).json(response('error', 'Not found', {}))
})


app.listen(config.PORT, () => {
    console.log(`Server run on port: ${config.PORT}`);
})
