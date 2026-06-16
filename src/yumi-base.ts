type Handler = (req: Request) => Response | Promise<Response>;

type Route = {
  method: string;
  path: string;
  handler: Handler;
};
class YumiBase<
  BasePath extends string = "/",
  CurrentPath extends string = BasePath,
> {
  constructor(
    protected readonly basePath: BasePath = "/" as BasePath
  ) { }


  private routes: Route[] = [];

  get(
    path: string = "",
    handler: Handler
  ) {
    this.routes.push({
      method: "GET",
      path,
      handler,
    });
  }


}

export { YumiBase };
