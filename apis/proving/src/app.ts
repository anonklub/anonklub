import 'express-async-errors'
import express from 'express'
import { provingRouter } from './routes'

const app = express()
app.use(express.json({ limit: '1mb' }), provingRouter)

export { app }
