import './mq/worker'
import 'express-async-errors'
import cors from 'cors'
import express, { Express } from 'express'
import { router } from './routes'

const app: Express = express()

app.use(cors())
app.use(express.json({ limit: '1mb' }), router)
app.use(express.static('public'))

export { app }
