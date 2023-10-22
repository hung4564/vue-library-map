import { ISource } from "../source";
import { Layer } from "@/model/datasource";
export interface IView<TSource extends ISource = ISource> {
  id: string;
  parent?: Layer<TSource>;
  setParent(_parent: Layer): void;
}
export declare type LayerBuildFunction<
  IReturn extends IView = IView,
  IOption extends object = any
> = {
  (layer: Layer, option: IOption): IReturn;
};
