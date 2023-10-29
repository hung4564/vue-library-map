import { IView, LayerBuildFunction } from "@/interface/datasource/view";

import { Layer } from "../Layer";

export abstract class ABuild<
  T extends {} = any,
  IBuildReturn extends IView = IView
> {
  key: string;
  option: T;
  build?: LayerBuildFunction<IBuildReturn>;
  constructor(key: string, option?: T, default_option?: Partial<T>) {
    this.key = key;
    this.option = Object.assign({}, default_option, option);
  }
  setBuild(build: any) {
    this.build = build;
    return this;
  }
  setForLayer(layer: Layer) {
    if (this.build) layer.setBuild(this.key, this.build, this.option);
    return this;
  }
  runAfterSetLayer?(layer: Layer): any;
}
