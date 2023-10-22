import { LayerPartContainer } from "./_default";
export declare class LayerViewContainer extends LayerPartContainer {
  views: any;
  add(key?: string, view?: {}): this;
  get(key?: string): any;
  runWithNameFunction(name_func: string, ...params: any[]): Promise<any[]>;
}
