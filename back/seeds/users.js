const faker = require('faker');
const jdenticon = require('jdenticon');
const fs = require('fs');

const { USERS_TO_SEED } = require('../constants');

exports.seed = knex => (
  knex('users')
    .del()
    .then(() => {
      const users = [];
      const picsFolder = './seeds/picsTemp';

      if (!fs.existsSync(picsFolder)) {
        fs.mkdirSync(picsFolder);
      }

      for (let i = 0; i <= USERS_TO_SEED; i++) {
        const username = faker.internet.userName();
        const png = jdenticon.toPng(username, 48);
        const path = `${picsFolder}/${username}.png`;

        fs.writeFileSync(path, png);

        const profilePic = fs.readFileSync(path, 'base64');

        fs.unlinkSync(path);

        users.push({
          username,
          profilePic,
          createdAt: faker.date.recent(),
          updatedAt: faker.date.future()
        });
      }

      // 👨‍💻 hardcoded username until login is implemented
      users[0].username = 'gmore';
      users[0].profilePic = 'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAABJ0RVh0U29mdHdhcmUASmRlbnRpY29um8oJfgAAAC1QTFRFAAAA6Ojo6OjoVFRU6OjoVFRUwHXRwHXRwHXRVFRUwHXRwHXRwHXRwHXRwHXR+C2ZeQAAAA90Uk5TAP+/fz///z+/jHJ/RsWMqHD4xAAAAR1JREFUeJzdlVsWwyAIRA0hiX3uf7m1PhAQY9J+tfxE7dwjMFad+5OYQgDN5lmOEKYcAkBSLcusRgXhADB91tVRQTiAXB91dUQIA0Dqg66OHCEMwAMA7xJrUS8lCaCTRFO0CuATo61NoJhp4zqRflyNsNG8fQdokysF2kBbPrXQBNoGV5Pegi2sbFHq4+fSWigBH1Z8lKcUDUCltMUNrqVrpueiaB83oB1sz0Vbb7ncVIPZ1vPGfeP0/bGKzIZOBxc8q33s9HvhSd094HTeofg3djolVE/I2Onx4Tt/vM//gT5wWqOGDBspT85IBCz5zkWGU1dvX5VgATuXMbLrHvAAoN6H8YOi37iC9IoGDRBitxWbV7QipnHyUfzxeAFuLRHx5FWwgAAAAABJRU5ErkJggg==';

      return knex('users').insert(users);
    })
);
