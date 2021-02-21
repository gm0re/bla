const faker = require('faker');

exports.seed = knex => (
  knex('users')
    .del()
    .then(() => {
      const users = [];
      const amount = 5;

      for (let i = 0; i <= amount; i++) {
        users.push({
          username: faker.internet.userName(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.future()
        });
      }

      console.log('users seeded:', users);

      return knex('users').insert(users);
    })
);
