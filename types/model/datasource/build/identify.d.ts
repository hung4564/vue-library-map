import { IdentifyOption, IdentifyView } from "@/interface/datasource/identify";
import { ABuild } from "./_default";
import { Layer } from "../Layer";
export declare class LayerIdentifyBuild extends ABuild<IdentifyOption> {
  constructor(option?: IdentifyOption);
  setFieldName(field_name?: string): this;
  setFieldId(field_id?: string): this;
}
export declare function createIdentifyView(
  layer: Layer,
  option?: IdentifyOption
): IdentifyView;
