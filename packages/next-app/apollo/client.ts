import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from "@apollo/client"
import { Auth } from "aws-amplify"
import { AUTH_TYPE, createAuthLink } from "aws-appsync-auth-link"
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link"
import appSyncConfig from "./../src/aws-exports"
import { cloneDeep, forOwn, isEmpty, isObject, isString } from "lodash"

function cleanObject<T extends { [key: string]: any }>(obj: T) {
  const cloneObj = cloneDeep(obj) // Clone original object
  const pruneNested = (obj: T) => {
    forOwn(obj, (value, key) => {
      if (
        (isString(value) && isEmpty(value)) ||
        (isObject(value) && isEmpty(pruneNested(value)))
      ) {
        // See https://github.com/microsoft/TypeScript/issues/32704
        // @ts-ignore: Type 'string' cannot be used to index type 'T'
        obj[key] = null
      }
    })
    return obj
  }
  return pruneNested(cloneObj)
}
const url = appSyncConfig.aws_appsync_graphqlEndpoint
const region = appSyncConfig.aws_appsync_region
const auth = {
  type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
  jwtToken: async () => {
    try {
      console.log("Verifying current session....")
      const sesh = await Auth.currentSession()
      console.log(sesh)
      const token = sesh.getIdToken().getJwtToken()
      console.log(token)
      return token
    } catch (err) {
      console.log("IT'S MEEEE 👰 ")
    }
  },
}
const httpLink = createHttpLink({ uri: url })
const middlewareLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    if (operation.variables.input) {
      operation.variables = { input: cleanObject(operation.variables.input) }
    } else {
      operation.variables = { limit: 300, ...operation.variables }
    }
  }
  return forward(operation)
})
const concatLink = middlewareLink.concat(httpLink)
const link = ApolloLink.from([
  // @ts-ignore - complains about auth type
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink(url, concatLink),
])
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false,
  }),
})
export default client
