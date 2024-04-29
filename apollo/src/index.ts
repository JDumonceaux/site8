import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import resolvers from "./resolvers.js";
import TrackAPI from "./trackapi.js";
//import TrackAPI from "./datasources/track-api.js";

// const images = [
//   {
//     file: "image10.jpeg",
//     description: "Cabin on the lake",
//   },
//   {
//     file: "image8.jpeg",
//     description: "Art Deco - Woman on white stairs",
//   },
// ];

// const mocks = {
//   Query: () => ({
//     imagesForHome: () => [...new Array(10)],
//   }),
//   Image: () => ({ file: "image10.jpeg", description: "Cabin on the lake" }),
// };

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves images from the "images" array above.
// const resolvers = {
//   Query: {
//     images: () => images,
//   },
// };

// async function startApolloServer() {
//   const server = new ApolloServer({ typeDefs, resolvers });
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//   });
//   console.log(`🚀 Server ready at ${url}`);
// }

// async function startApolloServer() {
//   const server = new ApolloServer({
//     schema: addMocksToSchema({
//       schema: makeExecutableSchema({ typeDefs, resolvers }),
//       mocks,
//     }),
//   });
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//   });
//   console.log(`🚀 Server ready at ${url}`);
// }

// async function startApolloServer() {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//   });
//   console.log(`🚀 Server ready at ${url}`);
// }

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      //  const { cache } = server;
      return {
        dataSources: {
          trackAPI: new TrackAPI(),
        },
      };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer();
