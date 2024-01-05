import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import { dashboard } from './dashboard'
import { proofHandler, swaggerRouter } from './handlers'

const router: Router = Router()

router.use('/', swaggerUi.serve)
router.get('/', swaggerRouter)

router.post('/proof', proofHandler)
router.use('/dashboard', dashboard.getRouter())

export { router }
