module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    user: 'user',
    password: 'root',
    database: 'bla'
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  }
};
