import { ABuild } from "../build/_default";
import { Layer } from "../Layer";
import LayerInfo from "@map/modules/LayerControl/Detail/LayerInfo.vue";
const KEY = "show_info";
type LayerInfoOption = {
  fields: {
    trans?: string;
    text?: string;
    value: string | undefined | ((layer: Layer<any>) => string | undefined);
    inline?: boolean;
  }[];
};
export class LayerInfoShowBuild extends ABuild<LayerInfoOption> {
  constructor({ fields }: LayerInfoOption) {
    super(KEY, { fields });
  }
  setForLayer(layer: Layer) {
    layer.getAction().addAction({
      id: KEY,
      component: LayerInfo,
      menu: {
        name: "info",
        type: "item",
        icon: ""
      },
      option: this.option
    });
    return this;
  }
}
