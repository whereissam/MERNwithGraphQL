import Header from "./component/Header"
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Client from "./component/Client"

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge (existing, incoming) {
            return incoming
          }
        },
        projects: {
          merge (existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache
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
