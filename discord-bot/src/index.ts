import 'init'
import { error, info } from '#/logger'
import { Client } from 'Client'
import { healthProbe } from 'healthprobe'
import { Container } from 'typedi'
<<<<<<< HEAD
||||||| parent of 35cbb99 (refactor: add info logs)
import { info } from '~'
=======
import { error, info } from '~'
>>>>>>> 35cbb99 (refactor: add info logs)

healthProbe.listen(3000)

const client = Container.get(Client)

const main = async () => client.init()

main()
  .then((client) => {
    info('Bot is running!')

    process.on('SIGINT', () => {
      info('Stopping bot...')
      client.stop()
      process.exit(0)
    })
  })
  .catch((err) => {
    error('Error starting bot:', err)
    process.exit(1)
  })
