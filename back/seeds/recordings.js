const faker = require('faker');
const { USERS_TO_SEED, RECORDINGS_TO_SEED } = require('../constants');

exports.seed = knex => (
  knex('recordings')
    .del()
    .then(() => {
      const recordings = [];

      // 👨‍⚕️ the fk ids used should be checked before.
      // always run: ALTER SEQUENCE recordings_id_seq RESTART 1;
      for (let i = 0; i <= RECORDINGS_TO_SEED; i++) {
        recordings.push({
          filename: faker.system.fileName(),
          filetype: faker.system.fileType(),
          filesize: faker.random.float(),
          duration: faker.random.float(),
          parentId: faker.random.number({ min: 1, max: RECORDINGS_TO_SEED }),
          userId: faker.random.number({ min: 1, max: USERS_TO_SEED }),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.future()
        });
      }

      // console.log('Recordings seeded:', recordings);

      return knex('recordings').insert(recordings);
    })
);
