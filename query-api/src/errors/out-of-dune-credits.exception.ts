import { HttpException, HttpStatus } from '@nestjs/common'

export class OutOfDuneCreditsException extends HttpException {
	constructor() {
		super('Dune credits are out.', HttpStatus.TOO_MANY_REQUESTS)
	}
}
