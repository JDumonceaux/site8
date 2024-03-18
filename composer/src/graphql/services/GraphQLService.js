import { Logger } from "../utils/Logger.js";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

const data = {
  warriors: [
    { id: "001", name: "Jaime" },
    { id: "002", name: "Jorah" },
  ],
};

const typeDefs = `
type Warrior {
  id: ID!
  name: String!
}

type Query {
  warriors: [Warrior]
}
`;

const resolvers = {
  Query: {
    warriors: (obj, args, context, info) => context.warriors,
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export class GraphQLService {
  async getMenus() {
    Logger.info(`GraphQLService: getMenus -> `);
    try {
      return graphqlHTTP({
        schema: executableSchema,
        context: data,
        graphiql: true,
      });
    } catch (error) {
      Logger.error(`GraphQLService: getMenus --> Error: ${error}`);
      throw error;
    }
  }
}
