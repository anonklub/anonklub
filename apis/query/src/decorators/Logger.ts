import { Container } from 'typedi'

import { logger } from '~/logger'

export function Logger(): ParameterDecorator {
  return (object, propertyKey, index) => {
    const propertyName = propertyKey ? propertyKey.toString() : ''
    Container.registerHandler({
      // @ts-ignore
      object,
      propertyName,
      index,
      value: () => logger,
    })
  }
}

export interface LoggerInterface {
  debug(message: string, ...args: any[]): void
  info(message: string, ...args: any[]): void
  warn(message: string, ...args: any[]): void
  error(message: string, ...args: any[]): void
}
