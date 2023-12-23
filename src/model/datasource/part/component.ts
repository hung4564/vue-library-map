import { EVENTBUS_TYPE, eventBus } from "@/utils/event-bus";
import {
  ILayerComponentItem,
  ILayerComponentView,
  LayerComponentOption
} from "@/interface/datasource/component";

import { Layer } from "../Layer";
import { LayerAction } from "@/interface/datasource/action";
import { getUUIDv4 } from "@/utils";

export class LayerComponentBuild {
  option: LayerComponentOption = {};
  build(layer: Layer) {
    return new LayerComponentView(layer, this.option);
  }
}
class LayerComponentView implements ILayerComponentView {
  option: LayerComponentOption;
  components: ILayerComponentItem[] = [];
  layer: Layer;
  constructor(layer: Layer, option: LayerComponentOption = {}) {
    this.option = option;
    this.layer = layer;
  }
  setFromAction(menu: LayerAction) {
    const id = getUUIDv4();
    eventBus.emit(EVENTBUS_TYPE.COMPONENT.ADD, {
      component: menu.component,
      option: menu.option,
      item: { parent: this.layer },
      id
    });
    this.add({ id });
    return this;
  }
  add(component: ILayerComponentItem): this {
    this.components.push(component);
    return this;
  }
  remove(component: ILayerComponentItem): this {
    this.components = this.components.filter((x) => x.id !== component.id);
    return this;
  }
  removeFromMap() {
    this.components.forEach((x) => {
      eventBus.emit(EVENTBUS_TYPE.COMPONENT.REMOVE, {
        id: x.id
      });
    });
  }
}
