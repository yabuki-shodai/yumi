import { YumiBase } from "./yumi-base.js";
class Yumi<
  BasePath extends string = "/"
> extends YumiBase<BasePath> { }

export { Yumi };