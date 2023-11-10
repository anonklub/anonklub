import { Test, TestingModule } from '@nestjs/testing'
import { AnonsetController } from './anonset.controller'
import { AnonsetService } from './anonset.service'

describe('AnonsetController', () => {
  let AnonsetController: AnonsetController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AnonsetController],
      providers: [AnonsetService],
    }).compile()

    AnonsetController = app.get<AnonsetController>(AnonsetController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(AnonsetController.getHello()).toBe('Hello World!')
    })
  })
})
