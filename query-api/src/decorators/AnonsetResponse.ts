import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

export function AnonsetResponse() {
  return applyDecorators(
    ApiResponse({
      description: 'Returns a list of addresses.',
      schema: { type: 'array', items: { type: 'string' } },
      status: 200,
    }),
  )
}
