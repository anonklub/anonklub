import { Injectable } from '@nestjs/common'

@Injectable()
export class AnonsetService {
  getHello(): string {
    return 'Hello World!'
  }
}
