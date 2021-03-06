import "graphql-import-node";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";

import * as typeDefs from "./schema/schema.graphql";
import { resolvers } from "./resolvers";

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
