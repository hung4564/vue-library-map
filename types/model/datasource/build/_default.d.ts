import { IView, LayerBuildFunction } from "@/interface/datasource/view";
import { Layer } from "../Layer";
export declare abstract class ABuild<
  T extends {} = any,
  IBuildReturn extends IView = IView
> {
  key: string;
  option: T;
  build?: LayerBuildFunction<IBuildReturn>;
  constructor(key: string, option?: T, default_option?: Partial<T>);
  setBuild(build: any): this;
  setForLayer(layer: Layer): this;
}
