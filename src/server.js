import Fastify from "fastify"
import dbConnector from './plugins/postgres'
import testRoute from './routes/routes'

const PORT = process.env.PORT ?? 3000

function getLoggerOptions() {
  // Only if the program is running in an interactive terminal
  if (process.stdout.isTTY) {
    return {
      level: "info",
      transport: {
        target: "pino-pretty",
        options: {
          translate: "HH:MM:ss Z",
          ignore: "pid,hostname"
        }
      }
    }
  }
}

const app = Fastify({
  logger: getLoggerOptions(),
  ajv: {
    customOptions: {
      coerceTypes: "array", // change type of data to match type keyword
      removeAdditional: "all" // Remove additional body properties
    }
  }
})

app.register(dbConnector)
app.register(testRoute, { prefix: "/api"})

/**
 * Run the server!
 */
async function main() {
  await app.ready()
  try {
    app.listen({ port: PORT })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

main()