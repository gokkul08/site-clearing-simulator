import fetch from "isomorphic-unfetch";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import auth0 from "../auth/auth0";

let accessToken: any = null;

const requestAccessToken = async () => {
  if (accessToken) return;

  const res = await fetch(`${process.env.APP_HOST}/api/session`);
  if (res.ok) {
    const json = await res.json();
    accessToken = json.accessToken;
  } else {
    accessToken = "public";
  }
};

// remove cached token on 401 from the server
const resetTokenLink = onError(({ networkError }) => {
  if (
    networkError &&
    networkError.name === "ServerError" &&
    networkError.statusCode === 401
  ) {
    accessToken = null;
  }
});

const createHttpLink = (headers: any) => {
  const httpLink = new HttpLink({
    uri: "https://flexible-mudfish-55.hasura.app/v1/graphql",
    credentials: "include",
    headers, // auth token is fetched on the server side
    fetch,
  });
  return httpLink;
};

const createWsLink = () => {
  return new GraphQLWsLink(
    createClient({
      url: "wss://flexible-mudfish-55.hasura.app/v1/graphql",
      connectionParams: async () => {
        await requestAccessToken(); // happens on the client
        return {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        };
      },
    })
  );
};

// const wsLink = new GraphQLWsLink(createClient({
//     url: 'wss://flexible-mudfish-55.hasura.app/v1/graphql',
//     connectionParams: async () => {
//         await requestAccessToken() // happens on the client
//         return {
//           headers: {
//             authorization: accessToken ? `Bearer ${accessToken}` : '',
//           },
//         }
//       },
// }));

// const createWSLink = () => {
//   return new WebSocketLink(
//     new SubscriptionClient('wss://flexible-mudfish-55.hasura.app/v1/graphql', {
//       lazy: true,
//       reconnect: true,
//       connectionParams: async () => {
//         await requestAccessToken() // happens on the client
//         return {
//           headers: {
//             authorization: accessToken ? `Bearer ${accessToken}` : '',
//           },
//         }
//       },
//     })
//   )
// }

export default function createApolloClient(initialState: any, headers: any) {
  const ssrMode = typeof window === "undefined";
  let link;
  if (ssrMode) {
    link = createHttpLink(headers);
  } else {
    link = createWsLink();
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  });
}
