import { IView } from "@/interface/datasource/view";
import { TLayer } from "../model/datasource";

export function getLayerFromView(view: IView): TLayer | undefined {
  return view.parent;
}
