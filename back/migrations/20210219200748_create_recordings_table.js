exports.up = knex => (
  knex.schema
    .hasTable('recordings')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('recordings', recordings => {
          recordings.increments('id').primary();
          recordings.string('filename', 100);
          recordings.string('filetype', 100);
          recordings.float('filesize');
          recordings.float('duration');
          recordings.timestamp('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6));
          recordings.timestamp('updatedAt', { precision: 6 }).defaultTo(null);
          recordings.timestamp('deletedAt', { precision: 6 }).defaultTo(null);
        });
      }
    })
);

exports.down = knex => (
  knex.schema.dropTable('recordings')
);
