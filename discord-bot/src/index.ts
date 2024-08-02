import 'init'
import { info } from '#/logger'
import { Client } from 'Client'
import { healthProbe } from 'healthprobe'
import { Container } from 'typedi'

healthProbe.listen(3000)

const client = Container.get(Client)
// console.log(client)

const main = async () => client.init()

main()
  .then((client) => {
    info('Bot is running!')

    process.on('SIGINT', () => {
      console.log('Stopping bot...')
      client.stop()
      process.exit(0)
    })
  })
  .catch((err) => {
    console.error('Error starting bot:', err)
    process.exit(1)
  })
