import { IResolvers } from "graphql-tools";

import { pubSub, JOBS_CHANGED, STATUS_CHANGED } from "./pubSub";
import { store } from "./store";

export const resolvers: IResolvers = {
  Query: {
    jobs: () => store.jobs,
    status: () => store.status,
  },
  Mutation: {
    addJob: () => {
      store.jobs.total++;
      store.jobs.running++;
      pubSub.publish(JOBS_CHANGED, { jobsChanged: store.jobs });

      setTimeout(() => {
        store.jobs.running--;
        pubSub.publish(JOBS_CHANGED, { jobsChanged: store.jobs });
      }, 30000);

      return store.jobs;
    },
  },
  Subscription: {
    jobsChanged: {
      subscribe: () => pubSub.asyncIterator([JOBS_CHANGED]),
    },
    statusChanged: {
      subscribe: () => pubSub.asyncIterator([STATUS_CHANGED]),
    },
  },
};
