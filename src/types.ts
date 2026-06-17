import type { Context } from "./context.js";

export type Handler = (c: Context) => Response | Promise<Response>;

export type Route = {
  method: string;
  path: string;
  handler: Handler;
};
