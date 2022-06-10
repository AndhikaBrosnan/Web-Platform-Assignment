import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BE_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
