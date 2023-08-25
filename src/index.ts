import { ServerConfig } from './config/config'
import { buildApp } from './app'

const start = async () => {
  const app = await buildApp()

  app.listen({ port: ServerConfig.port })
}

start().catch((error) => {
  console.error('start error - ', error)
})
