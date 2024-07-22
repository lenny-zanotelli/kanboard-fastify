import fastifyPlugin from 'fastify-plugin'
import fastifyPg from '@fastify/postgres'

  /**
   * @param {FastifyInstance} instance
   * @param {Object} options
   */
  
  async function dbConnector (fastify, options) {
    fastify.register(fastifyPg, {
      connectionString: `${process.env.POSTGRES_URL}`
    })
    console.log(process.env.POSTGRES_URL)
    fastify.log.info("Connected to Database",)
  }

export default fastifyPlugin(dbConnector)
  