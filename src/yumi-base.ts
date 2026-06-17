import { Context } from "./context.js";
import type {
  Handler,
  Route
} from "./types.js";

class YumiBase<
  BasePath extends string = "/",
  CurrentPath extends string = BasePath,
> {
  constructor(
    protected readonly basePath: BasePath = "/" as BasePath
  ) { }


  private routes: Route[] = [];

  get(
    path: string = "/",
    handler: Handler
  ) {
    this.routes.push({
      method: "GET",
      path: path === "" ? "/" : path,
      handler,
    });
  }

  request(input: string | Request, init?: RequestInit): Promise<Response> {
    const request = input instanceof Request ? input : new Request(input, init);
    return Promise.resolve(this.dispatch(request));
  }

  getRoutes(): readonly Route[] {
    return this.routes.slice();
  }

  fetch(url: string): Response | Promise<Response> {
    return this.dispatch(new Request(url));
  }

  dispatch(request: Request): Response | Promise<Response> {

    const path = new URL(request.url).pathname;

    // マッチするルートを探す
    const matchResult = this.routes.find((route) => {
      return route.method === request.method && route.path === path;
    });

    if (!matchResult) {
      return new Response("Not Found", { status: 404 });
    }
    // contextを作成
    const c = new Context(request);

    return matchResult.handler(c);
  }


}

export { YumiBase };
