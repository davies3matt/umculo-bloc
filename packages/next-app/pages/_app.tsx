import { ApolloProvider } from "@apollo/client"
import { Web3ReactProvider } from "@web3-react/core"
import Amplify from "aws-amplify"
import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import getLibrary from "../getLibrary"
import "../styles/globals.css"
import awsconfig from "../src/aws-exports"
import theme from "../src/theme"
import AuthProvider from "../src/context/AuthProvider";
import client from "../apollo/client"

Amplify.configure(awsconfig)

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ApolloProvider
          // @ts-ignore
          client={client}
        >
          <Component {...pageProps} />
        </ApolloProvider>
      </Web3ReactProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default NextWeb3App
