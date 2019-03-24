const Promise = require('promise')

// static list of users
const users = [
  {
    id: 1,
    display: 'Clever Tech',
    email: 'clever@example.com',
    username: 'clevertech',
    password: 'cleverpass'
  }
]

module.exports = () => {
  return new Promise.resolve(users)
}

