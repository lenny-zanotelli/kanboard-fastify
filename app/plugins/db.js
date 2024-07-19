import fastifyPlugin from 'fastify-plugin'
import fastifyPg from '@fastify/postgres'

/**
 * @param {FastifyInstance} instance
 * @param {Object} options
 */
async function dbConnector (fastify, options) {
  fastify.register(fastifyPg, {
    connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_HOST}/${process.env.DB_DATABASE}`
  })
}

export default fastifyPlugin(dbConnector)
 