const {DB_USER, DB_PASSWORD} = process.env

module.exports = {

    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        database: 'wave_analysis',
        port: 5432,
        user: 'postgres',
        password: 'password'
      },
      migrations: {
        directory: './migrations'
      },
      seeds: {
        directory: './seeds'
      },
      useNullAsDefault: true
    },

    test: {
      client: 'pg',
      connection:'postgres://localhost/',
      migrations: {
        directory: './migrations'
      },
      seeds: {
        directory: './seeds'
      },
      useNullAsDefault: true
    },

    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: './migrations'
      },
      seeds: {
        directory: './db/seeds/production'
      },
      useNullAsDefault: true
    }

}

