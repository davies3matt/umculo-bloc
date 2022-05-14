import { ApolloProvider } from "@apollo/client"
import React from "react"
import Amplify from "aws-amplify"
import { NativeBaseProvider } from "native-base"
import awsconfig from "./src/aws-exports"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import client from "./apollo"
import AuthProvider from "./src/contexts/AuthContext"
import AppNavigation from "./src/navigation"
import { theme } from "./src/theme"

Amplify.configure(awsconfig)

const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
}

const App = () => {
  return (
    // @ts-ignore
    <ApolloProvider client={client}>
      <NativeBaseProvider theme={theme} config={config}>
        <AuthProvider>
          <AppNavigation />
        </AuthProvider>
      </NativeBaseProvider>
    </ApolloProvider>
  )
}

export default App
