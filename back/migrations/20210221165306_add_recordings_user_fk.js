exports.up = knex => (
  knex.schema.table('recordings', recordingsTable => {
    recordingsTable.integer('userId').unsigned();
    recordingsTable.foreign('userId').references('users.id');
  })
);

exports.down = knex => (
  knex.schema.table('recordings', recordingsTable => {
    recordingsTable.dropForeign('userId');
    recordingsTable.dropColumn('userId');
  })
);
