import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://hub.snapshot.org/graphql",
  cache: new InMemoryCache(),
});

export const snapshotQuery = (address) => gql`
  query {
    proposals(
      first: 1000
      where: { author: "${address}" }
      orderBy: "created"
      orderDirection: desc
    ) {
      votes
    }
    votes(
      first: 2
      where: { voter: "${address}" }
    ) {
      id
    }
  }
`;