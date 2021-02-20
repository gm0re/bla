const faker = require('faker');

exports.seed = knex => (
  knex('recordings')
    .del()
    .then(() => {
      const recordings = [];
      const amount = 50;

      for (let i = 0; i <= amount; i++) {
        recordings.push({
          filename: faker.system.fileName(),
          filetype: faker.system.fileType(),
          filesize: faker.random.float(),
          length: faker.random.float(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.future()
        });
      }

      console.log('Recordings seeded:', recordings);

      return knex('recordings').insert(recordings);
    })
);
