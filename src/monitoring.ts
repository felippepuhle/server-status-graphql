import { pubSub, STATUS_CHANGED } from "./pubSub";
import { store } from "./store";

const randomStatusNumber = (runningJobsQty: number) => {
  const min = runningJobsQty * 10;
  const max = (runningJobsQty + 1) * 10;

  const rand = Math.random() * (max - min) + min;

  return Math.min(100, rand);
};

export const updateServerStatus = () => {
  store.status.cpu = randomStatusNumber(store.jobs.running);
  store.status.memory = randomStatusNumber(store.jobs.running);
  store.status.disk = randomStatusNumber(store.jobs.running);

  pubSub.publish(STATUS_CHANGED, { statusChanged: store.status });
};
