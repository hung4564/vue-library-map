import { Layer } from "@/model/datasource";

export interface IView {
  id: string;
  parent?: Layer;
  setParent(_parent: Layer): void;
}
export type LayerBuildFunction<
  IReturn extends IView = IView,
  IOption extends object = any
> = {
  (layer: Layer, option: IOption): IReturn;
};
