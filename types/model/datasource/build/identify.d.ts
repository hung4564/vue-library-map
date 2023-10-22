import { Layer } from "../Layer";
import { ABuild } from "./_default";
import { IdentifyOption, IdentifyView } from "@/interface/datasource/identify";
export declare class LayerIdentifyBuild extends ABuild<IdentifyOption> {
  constructor(option?: IdentifyOption);
  setFieldName(field_name?: string): this;
  setFieldId(field_id?: string): this;
}
export declare function createIdentifyView(
  layer: Layer,
  option?: IdentifyOption
): IdentifyView;
