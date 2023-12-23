import { ABuild } from "../build/_default";
import GeojsonUpdateControl from "@map/modules/LayerControl/UpdateSourceControl/GeojsonUpdateControl.vue";
import { Layer } from "../Layer";
const KEY = "edit_source";
type LayerEditSourceOption = {};
export class LayerEditSourceBuild extends ABuild<LayerEditSourceOption> {
  constructor(options?: LayerEditSourceOption) {
    super(KEY, options);
  }
  setForLayer(layer: Layer) {
    layer.getAction().addAction({
      id: KEY,
      component: GeojsonUpdateControl,
      menu: {
        name: "edit source",
        type: "item",
        icon: ""
      },
      option: this.option
    });
    return this;
  }
}
