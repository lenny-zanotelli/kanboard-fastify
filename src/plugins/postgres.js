import fp from 'fastify-plugin'
import { Client } from 'pg' 

const client = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_SERVICE,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB
})

  /**
   * @param {FastifyInstance} instance
   * @param {Object} options
   */
  
  async function dbConnector (fastify, options) {
    try {
      await client.connect()
      fastify.log.info("Connected to Database")
      fastify.decorate('db', { client })      
    } catch (err) {
      fastify.log.error(err) 
    }
  }

export default fp(dbConnector)