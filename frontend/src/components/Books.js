import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const Books = () => (
  <Query
    query={gql`
      {
        books {
          title
          author
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>

      const { books } = data
      const bookItems = books.map((book, index) => <li key={index}>{book.title}, {book.author}</li>)
      return (
        <ul>{bookItems}</ul>
      )
    }}
  </Query>
)

export default Books