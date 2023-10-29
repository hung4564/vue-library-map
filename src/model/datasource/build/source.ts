import { ABuild } from "./_default";
import { ISourceBuild } from "@/interface/source";
import { Layer } from "../Layer";

export class LayerSourceBuild<TBuild extends ISourceBuild> extends ABuild<any> {
  _layer_build: TBuild;
  constructor(_layer_build: TBuild) {
    super("source");
    this._layer_build = _layer_build;
  }
  setForLayer(layer: Layer) {
    layer.setSource(this._layer_build.build());
    return this;
  }
}
