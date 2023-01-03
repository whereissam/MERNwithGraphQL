import Header from "./component/Header"
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Client from "./component/Client"
import Projects from "./component/Projects."
import AddClientModal from "./component/AddClientModal"

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
          <AddClientModal />
          <Projects />
          <Client></Client>
        </div>
      </ApolloProvider>
    </>
  )
}

export default App
