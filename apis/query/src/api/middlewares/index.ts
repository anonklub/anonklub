import { ErrorHandlerMiddleware } from './Error'
import { LogMiddleware } from './Log'
import { SecurityMiddleware } from './Security'
import { SecurityHstsMiddleware } from './SecurityHsts'

export const middlewares = [
  SecurityMiddleware,
  SecurityHstsMiddleware,
  LogMiddleware,
  ErrorHandlerMiddleware,
]
