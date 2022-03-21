import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { Auth } from 'aws-amplify';
import { AUTH_TYPE, createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { cleanObject } from './src/utils/cleanObject';
import appSyncConfig from './src/aws-exports';

const url = appSyncConfig.aws_appsync_graphqlEndpoint;
const region = appSyncConfig.aws_appsync_region;
const auth = {
  type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
  jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
};
const httpLink = createHttpLink({ uri: url });
const middlewareLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    if (operation.variables.input) {
      operation.variables = { input: cleanObject(operation.variables.input) };
    } else {
      operation.variables = { limit: 300, ...operation.variables };
    }
  }
  return forward(operation);
});
const concatLink = middlewareLink.concat(httpLink);
const link = ApolloLink.from([
  // @ts-ignore - complains about auth type
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink(url, concatLink),
]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
export default client;