const faker = require('faker');
const { USERS_TO_SEED } = require('../constants');

exports.seed = knex => (
  knex('users')
    .del()
    .then(() => {
      const users = [];

      for (let i = 0; i <= USERS_TO_SEED; i++) {
        users.push({
          username: faker.internet.userName(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.future()
        });
      }

      // 👨‍💻 hardcoded username until login is implemented
      users[0].username = 'gmore';

      // console.log('users seeded:', users);

      return knex('users').insert(users);
    })
);
