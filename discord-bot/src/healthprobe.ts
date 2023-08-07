import express, { Express } from 'express'

const healthProbe: Express = express()

healthProbe.get('/', (_, res) => {
  res.status(200).send('AnonKlub Discord bot is running!')
})

export { healthProbe }
