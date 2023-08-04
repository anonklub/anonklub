import { app } from './app'

// TODO: use env var or config file to set port, and default to 3000 if not set
const port = 3000

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
  console.log('Queue dashboard available at http://localhost:3000/dashboard')
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})
