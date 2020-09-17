import { PubSub } from "apollo-server-express";

export const pubSub = new PubSub();

export const JOBS_CHANGED = "JOBS_CHANGED";
export const STATUS_CHANGED = "STATUS_CHANGED";
