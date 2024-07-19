// ESM
import Fastify from 'fastify'
import db from './plugins/db.js'
import firstRoute from './routes/routes.js'

const fastify = Fastify({
  logger: true
})

fastify.register(db)
fastify.register(firstRoute)

/**
 * Run the server!
 */
const start = () => {
  try {
    fastify.listen({ port: process.env.PORT })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()