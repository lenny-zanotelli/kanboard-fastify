import env from '@fastify/env'

const schema = {
  type: "object",
  required: [
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "POSTGRES_DB",
    "POSTGRES_PORT",
    "POSTGRES_SERVICE",
    "POSTGRES_URL"
  ],
  properties: {
    //DATABASE
    POSTGRES_SERVICE: {
      type: "string",
      default: "localhost"
    },
    POSTGRES_PORT: {
      type: "number",
      default: 5432
    },
    POSTGRES_USER: {
      type: "string"
    },
    POSTGRES_PASSWORD: {
      type: "string"
    },
    POSTGRES_DB: {
      type: "string"
    },
    POSTGRES_URL: {
      type: "string"
    }
  }
};

export const autoConfig = {
  confKey: "config",
  schema,
  dotenv: true,
  data: process.env
};

export default env;