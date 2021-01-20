const devConfig =  [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
      './src/modules/**/infra/typeorm/entities/*.ts'
    ],
    migrations: [
      './src/shared/infra/typeorm/migrations/*.ts'
    ],
    cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations'
    }
  }
]

const prodConfig =  [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
      './dist/modules/**/infra/typeorm/entities/*.js'
    ],
    migrations: [
      './dist/shared/infra/typeorm/migrations/*.js'
    ],
    cli: {
      migrationsDir: './dist/shared/infra/typeorm/migrations'
    }
  }
]

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
