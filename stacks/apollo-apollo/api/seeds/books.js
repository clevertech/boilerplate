
module.exports.seed = function(knex) {
  // Deletes ALL existing entries
  knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {
          id: 1,
          title: 'Harry Potter and the Chamber of Secrets',
          author: 'J.K. Rowling',
          pubdate: '2017-01-10T21:33:15.233Z'
        },
        {
          id: 2,
          title: 'Jurassic Park',
          author: 'Michael Crichton',
          pubdate: '2018-01-10T00:00:00.000Z'
        }
      ])
    })
}
