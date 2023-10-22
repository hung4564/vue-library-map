import { ISourceBuild } from "@/interface/source";
import { Layer } from "../Layer";
export declare class LayerSourceBuild<T extends ISourceBuild> {
  option: any;
  build: T;
  constructor(build: T, option?: {});
  protected asProxy(): LayerSourceBuild<T>;
  make(): T;
  this(): this;
  setForLayer(layer: Layer): this;
}
