import 'reflect-metadata'
import { useContainer } from 'routing-controllers-extended'
import { Container } from 'typedi'
import { app } from './app'

// Setup routing-controllers-extended to use typedi container.
useContainer(Container)

app.listen(3000)

console.log('Server 👂 on port 3000')
