/**
 * Encapsulate the routes
 * @param {FastifyInstance} fastify Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to  https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */

async function routes (fastify, options) {
  // Testing route
  fastify.get('/', async (request, reply) => {
    return { hello: 'world'}
  })

  fastify.get('/health', async (request, reply) => {
    await fastify.pg.connect(); // Attempt a connection
      try {
          reply.send({ health: 'UP' })
      } catch (err) {
          reply.send(500, { health: 'DOWN', error: err.message })
      }
  });

  fastify.get('/user', async (request, reply) => {
    try {
      const { rows } = await fastify.pg.query(
        `CREATE TABLE users(id serial PRIMARY KEY, username VARCHAR (50) NOT NULL);`
      )
      release(client)
      reply.send(rows)
    } catch (error) {
      reply.send(500, error)
    }
  })
}

export default routes