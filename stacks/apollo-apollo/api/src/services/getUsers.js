const Promise = require('promise')

// static list of users
const users = [
  {
    id: 1,
    name: 'CleverTech',
    email: 'clever@example.com',
    password: 'cleverpass'
  }
]

module.exports = () => {
  return new Promise.resolve(users)
}

