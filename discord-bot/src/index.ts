import 'init'
import { Container } from 'typedi'
import { info } from '~'
import { Client } from 'Client'
import { healthProbe } from 'healthprobe'

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
