import { ABuild } from "../build/_default";
import { Layer } from "../Layer";
declare type LayerInfoOption = {
  fields: {
    trans?: string;
    text?: string;
    value: string | undefined | ((layer: Layer<any>) => string | undefined);
    inline?: boolean;
  }[];
};
export declare class LayerInfoShowBuild extends ABuild<LayerInfoOption> {
  constructor({ fields }: LayerInfoOption);
  setForLayer(layer: Layer): this;
}
export {};
