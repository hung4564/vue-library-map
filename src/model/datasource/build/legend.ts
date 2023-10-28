import { LegendOption, LegendView } from "@/interface/datasource/legend";

import { ABuild } from "./_default";
import { Layer } from "../Layer";

export class LayerLegendBuild extends ABuild<LegendOption> {
  constructor() {
    super("legend", { items: [] });
    this.setBuild(createIdentifyView);
  }
  addItem(item: any) {
    if (!this.option.items) {
      this.option.items = [];
    }
    this.option.items.push(item);
    return this;
  }
  setComponent(component: any) {
    this.option.component = component;
    return this;
  }
  setItems(items: any[] = []) {
    this.option.items = items;
    return this;
  }
}
export function createIdentifyView(
  layer: Layer,
  config: LegendOption
): LegendView {
  let parent = layer;
  const temp = {
    setParent(_parent: Layer) {
      parent = _parent;
    },
    get parent() {
      return parent;
    },
    get id() {
      return parent.id;
    },
    get name() {
      return parent.name;
    },
    config
  };
  return temp;
}
