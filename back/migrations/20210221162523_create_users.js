exports.up = knex => (
  knex.schema
    .hasTable('users')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('users', recordings => {
          recordings.increments('id').primary();
          recordings.string('username', 100);
          recordings.datetime('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6));
          recordings.datetime('updatedAt', { precision: 6 }).defaultTo(null);
          recordings.datetime('deletedAt', { precision: 6 }).defaultTo(null);
        });
      }
    })
);

exports.down = knex => (
  knex.schema.dropTable('users')
);
