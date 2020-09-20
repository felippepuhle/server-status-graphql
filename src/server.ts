import express from "express";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";

import { updateServerStatus } from "./monitoring";
import { schema } from "./schema";

const PORT = process.env.PORT || 4000;

const app = express();

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
});

app.use("*", cors());
app.use(compression());

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  setInterval(updateServerStatus, 5000);

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
