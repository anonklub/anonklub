import { OutOfDuneCreditsException } from '../errors/out-of-dune-credits.exception'

export function HandleDuneCreditsError() {
	return (
		_target: any,
		_propertyName: string,
		descriptor: PropertyDescriptor,
	) => {
		const originalMethod = descriptor.value

		descriptor.value = function (...args: any[]) {
			const result = originalMethod.apply(this, args)
			if (result instanceof Promise) {
				return result.catch((error: Error) => {
					if (
						error.message.includes(
							'api request would exceed your configured limits per billing cycle',
						)
					) {
						throw new OutOfDuneCreditsException()
					}
					throw error
				})
			}
			return result
		}
	}
}
