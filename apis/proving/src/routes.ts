import { Router } from 'express'
import { dashboard } from './dashboard'
import { proofHandler } from './handlers/proof'

const router = Router()

router.post('/proof', proofHandler)
router.use('/dashboard', dashboard.getRouter())

export { router }
