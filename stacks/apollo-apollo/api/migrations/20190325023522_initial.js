
exports.up = function(knex, Promise) {
  return Promise.all([
    // user table
    knex.schema.createTable('users', (t) => {
      t.increments('id').primary()
      t.string('username', 100).notNullable().unique()
      t.string('email').notNullable().unique()
      t.string('display').nullable()
      t.text('password').notNullable()
      t.timestamps(true, true)
    }),

    // books table
    knex.schema.createTable('books', (t) => {
      t.increments('id').primary()
      t.string('title').notNullable()
      t.string('author').notNullable()
      t.datetime('pubdate').nullable()
      t.timestamps(true, true)
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('books'),
    knex.schema.dropTableIfExists('users')
  ])

}
