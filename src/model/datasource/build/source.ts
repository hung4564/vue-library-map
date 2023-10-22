import { ISourceBuild } from "@/interface/source";
import { Layer } from "../Layer";

export class LayerSourceBuild<T extends ISourceBuild> {
  option: any;
  build: T;
  constructor(build: T, option = {}) {
    this.build = build;
    this.option = Object.assign({}, option);
    return this.asProxy();
  }
  protected asProxy() {
    const handler = {
      get: function (target: LayerSourceBuild<T>, prop: string) {
        if (hasKey(target, prop)) {
          return target[prop];
        }
        return function wrapper(...args: any[]): LayerSourceBuild<T> {
          if (
            hasKey(target.build, prop) &&
            typeof target.build[prop] === "function"
          ) {
            (target.build[prop] as any)(...args);
          }
          return target;
        };
      }
    };

    return new Proxy(this, handler);
  }
  make() {
    return this as any as T;
  }
  this() {
    return this;
  }
  setForLayer(layer: Layer) {
    layer.setSource(this.build.build());
    return this;
  }
}
const hasKey = <T extends object>(obj: T, k: keyof any): k is keyof T =>
  k in obj;
