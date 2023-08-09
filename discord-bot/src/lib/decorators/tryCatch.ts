import { error } from '~'

type ErrorHandler = (err: Error, ...args: any[]) => void | Promise<void>

export function tryCatch(onError?: ErrorHandler): MethodDecorator {
  return function (
    _target: any,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]): Promise<void> {
      try {
        await originalMethod.call(this, ...args)
      } catch (err) {
        error(err)
        if (onError !== undefined) await onError(err as Error, ...args)
      }
    }

    return descriptor
  }
}
