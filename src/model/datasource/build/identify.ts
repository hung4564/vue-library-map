import { IdentifyOption, IdentifyView } from "@/interface/datasource/identify";

import { ABuild } from "./_default";
import { KEY_BUILD } from "../type";
import { Layer } from "../Layer";

export class LayerIdentifyBuild extends ABuild<IdentifyOption> {
  constructor(option: IdentifyOption = {}) {
    super(KEY_BUILD.IDENTIFY, option, {});
    this.setFieldName().setFieldId();
    this.setBuild(createIdentifyView);
  }
  setFieldName(field_name = "name") {
    this.option.field_name = field_name;
    return this;
  }
  setFieldId(field_id = "id") {
    this.option.field_id = field_id;
    return this;
  }
}
export function createIdentifyView(
  layer: Layer,
  option: IdentifyOption = {}
): IdentifyView {
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
    config: {
      field_name: "name",
      field_id: "id"
    }
  };
  if (option.field_name) {
    temp.config.field_name = option.field_name;
  }

  if (option.field_id) {
    temp.config.field_id = option.field_id;
  }

  return temp;
}
