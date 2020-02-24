import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { AppLoading } from "expo"
import { Asset } from "expo-asset"
import * as Font from "expo-font"
import { AsyncStorage } from "react-native"
import { InMemoryCache } from "apollo-cache-inmemory"
import { persistCache } from "apollo-cache-persist"
import { ThemeProvider } from "styled-components"

///////////////
import { ApolloProvider } from "react-apollo-hooks"

import { ApolloClient } from "apollo-client"
// import link from "./apollo1"

// import ApolloClient from "apollo-boost"
// import apolloClientOptions from "./apollo"
import { HttpLink } from "apollo-link-http"
import { WebSocketLink } from "apollo-link-ws"
////////
import styles from "./styles"
import NavController from "./components/NavController"
import { AuthProvider } from "./AuthContext"

import { onError } from "apollo-link-error"
import { ApolloLink, split } from "apollo-link"
import { getMainDefinition } from "apollo-utilities"

//////////////////////
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true
  }
})
/////////////////
export default function App() {
  //AsyncStorage.clear()
  const [loaded, setLoaded] = useState(false)
  const [client, setClient] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      })
      await Asset.loadAsync([require("./assets/logo.png")])
      const cache = new InMemoryCache()
      await persistCache({
        cache,
        storage: AsyncStorage
      })
      const client = new ApolloClient({
        cache,
        request: async operation => {
          const token = await AsyncStorage.getItem("jwt")
          return operation.setContext({
            headers: { Authorization: `Bearer ${token}` }
          })
        },
        link: ApolloLink.from([
          onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
              graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
              )
            if (networkError) console.log(`[Network error]: ${networkError}`)
          }),
          split(
            ({ query }) => {
              const definition = getMainDefinition(query)
              return (
                definition.kind === "OperationDefinition" && definition.operation === "subscription"
              )
            },

            // ...apolloClientOptions
            // link
            wsLink,
            httpLink
          )
        ])
      })
      //
      // const client = new ApolloClient({
      //   cache,
      //   request: async operation => {
      //     const token = await AsyncStorage.getItem("jwt")
      //     return operation.setContext({
      //       headers: { Authorization: `Bearer ${token}` }
      //     })
      //   },
      //   link: ApolloLink.from([
      //     onError(({ graphQLErrors, networkError }) => {
      //       if (graphQLErrors)
      //         graphQLErrors.map(({ message, locations, path }) =>
      //           console.log(
      //             `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      //           )
      //         )
      //       if (networkError) console.log(`[Network error]: ${networkError}`)
      //     }),
      //     split(
      //       ({ query }) => {
      //         const definition = getMainDefinition(query)
      //         return (
      //           definition.kind === "OperationDefinition" && definition.operation === "subscription"
      //         )
      //       },
      //       wsLink,
      //       ...apolloClientOptions
      //     )
      //   ])
      // })
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn")
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false)
      } else {
        setIsLoggedIn(true)
      }
      setLoaded(true)
      setClient(client)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    preLoad()
  }, [])

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  )
}

// link: ApolloLink.from([
//   onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors)
//       graphQLErrors.forEach(({ message, locations, path }) =>
//         console.log(
//           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//         )
//       )
//     if (networkError) console.log(`[Network error]: ${networkError}`)
//   }),

//   split(
//     // split based on operation type
//     ({ query }) => {
//       const definition = getMainDefinition(query)
//       return (
//         definition.kind === "OperationDefinition" && definition.operation === "subscription"
//       )
//     },
//     ...wsLink, //<-subscription
//     ...httpLink
//   )
// ])
