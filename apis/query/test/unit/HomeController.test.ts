import request from 'supertest'
import { app } from 'src/app'

describe('Home Controller', () => {
  describe('GET /', () => {
    it('returns HTML', async () => {
      await request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
    })
  })
})
