import { Router } from 'express'
import { proofHandler } from './handlers/proof'

export const router = Router().post('/proof', proofHandler)
