module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    user: 'root',
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
