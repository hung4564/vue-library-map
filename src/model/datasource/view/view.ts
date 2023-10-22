import { IView } from "@/interface/datasource/view";
import { Base } from "../../Base";
import { Layer } from "../Layer";

export class AView extends Base implements IView {
  parent?: Layer = undefined;
  runAfterSetParent?: CallableFunction;
  data_id?: string;
  setParent(_parent: Layer) {
    this.parent = _parent;
    this.data_id = _parent.id;
    if (this.runAfterSetParent) {
      this.runAfterSetParent();
    }
  }
}
