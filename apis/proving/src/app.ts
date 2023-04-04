import './mq/worker'
import 'express-async-errors'

import express from 'express'
import { router } from './routes'

const app = express()
app.use(express.json({ limit: '1mb' }), router)

export { app }
