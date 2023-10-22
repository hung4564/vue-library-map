import { IView } from "@/interface/datasource/view";
import { Base } from "../../Base";
import { Layer } from "../Layer";
export declare class AView extends Base implements IView {
  parent?: Layer;
  runAfterSetParent?: CallableFunction;
  data_id?: string;
  setParent(_parent: Layer): void;
}
