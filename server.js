// ESM
import Fastify from 'fastify'
import dbConnector from './app/plugins/database/db.js'
import testRoute from './app/routes/routes.js'

const PORT = process.env.PORT || 3000

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  }
})

fastify.register(dbConnector)
fastify.register(testRoute, { prefix: "/api"})

/**
 * Run the server!
 */
async function main() {
  await fastify.ready()
  fastify.listen({
    port: PORT
  })
}

main()