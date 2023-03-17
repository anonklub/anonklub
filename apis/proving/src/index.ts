import { app } from './app'

// TODO: use env var or config file to set port, and default to 3000 if not set
const port = 3000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
