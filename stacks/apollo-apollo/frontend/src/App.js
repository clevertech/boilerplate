import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { getClient } from './config/apollo'

import LayoutShell from './components/LayoutShell'
import Routes from './Routes'

const App = (props) => {
  let client = getClient({})

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <LayoutShell>
          <Routes />
        </LayoutShell>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default App
