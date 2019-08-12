export const mockDbClient = {
  query: jest.fn(),
  release: jest.fn(),
  on: jest.fn()
}

export const Pool = function() {
  return {
    connect: () => {
      return mockDbClient
    },
    on: function(event, callback) {
      if (event === 'connect') {
        callback(mockDbClient)
      }
    }
  }
}

export default {
  Pool
}