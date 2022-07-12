import Header from "./component/Header"
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Client from "./component/Client"

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

function App () {
  return (
    <>
      <ApolloProvider client={client}>
        <Header></Header>
        <div className="container">
          <Client></Client>
        </div>
      </ApolloProvider>
    </>
  )
}

export default App
