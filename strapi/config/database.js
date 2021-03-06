module.exports = ({ env }) => {
  if (env("NODE_ENV") === "production") {
    return {
      defaultConnection: "default",
      connections: {
        default: {
          connector: "bookshelf",
          settings: {
            client: "postgres",
            host: env("AWS_RDS_DATABASE_HOST"),
            port: env.int("AWS_RDS_DATABASE_PORT"),
            database: env("AWS_RDS_DATABASE_NAME"),
            username: env("AWS_RDS_DATABASE_USERNAME"),
            password: env("AWS_RDS_DATABASE_PASSWORD"),
          },
          options: {
            ssl: false,
          },
        },
      },
    };
  }
  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "sqlite",
          filename: env("DATABASE_FILENAME", ".tmp/data.db"),
        },
        options: {
          useNullAsDefault: true,
        },
      },
    },
  };
};
