import React from 'react'
import { gql, useQuery } from '@apollo/client'
//gql : make a query

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`

export default function Client() {
  const { loading, error, data } = useQuery(GET_CLIENTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something Went Wrong</p>

  return <>{!loading && !error && <h1>Clients</h1>}</>
}
