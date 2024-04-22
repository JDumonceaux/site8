import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Image" type defines the queryable fields for every image in our data source.
  type Image {
    file: String
    description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "images" query returns an array of zero or more Images (defined above).
  type Query {
    images: [Image]
  }
`;

const images = [
  {
    file: "image10.jpeg",
    description: "Cabin on the lake",
  },
  {
    title: "image8.jpeg",
    author: "Art Deco - Woman on white stairs",
  },
];
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves images from the "images" array above.
const resolvers = {
  Query: {
    images: () => images,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
