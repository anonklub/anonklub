import { type ArgumentsHost, Catch, type ExceptionFilter } from '@nestjs/common'
import type { Response } from 'express'
import { OutOfDuneCreditsException } from './out-of-dune-credits.exception'

@Catch(OutOfDuneCreditsException)
export class OutOfDuneCreditsFilter implements ExceptionFilter {
  catch(exception: OutOfDuneCreditsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    response.status(status).json({
      message: 'Dune credits are out.',
      statusCode: exception.getStatus(),
    })
  }
}
