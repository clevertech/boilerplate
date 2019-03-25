const { hashSync } = require('bcrypt')

module.exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'clever',
          password: hashSync('cleverpass', 10),
          email: 'clever@example.com',
          display: 'Clever'
        },
        {
          id: 2,
          username: 'tech',
          password: hashSync('techpass', 10),
          email: 'tech@example.com',
          display: 'Tech'
        }
      ])
    })
}
