/**
 * Encapsulate the routes
 * @param {FastifyInstance} fastify Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to  https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */

async function testRoute (fastify, options) {
  // Testing route
  fastify.get('/', async (request, reply) => {
    return { hello: 'world'}
  })

  fastify.get('/health', async (request, reply) => {
    await fastify.pg.connect(); // Attempt a connection
      try {
          reply.send({ health: 'UP' })
      } catch (err) {
          reply.log.error('Database connection error:', err.message)
          reply.send(500, { health: 'DOWN', error: err.message })
      }
  });

  fastify.get('/user', async (request, reply) => {
    await fastify.pg.connect(); // Attempt a connection
    try {
      const result = await fastify.pg.query(
        `SELECT * FROM pg_catalog.pg_tables;`
      )
      reply.send(200, { result })
    } catch (err) {
      reply.log.error('Database connection error:', err.message)
      reply.send(500, { health: 'DOWN', error: err.message })
    }
  })
}

export default testRoute