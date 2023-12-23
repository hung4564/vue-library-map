import { LayerAction } from "./action";

export interface ILayerComponentItem {
  id: string;
  open?: () => void;
  close?: () => void;
}
export interface ILayerComponentView {
  components: ILayerComponentItem[];
  add(component: ILayerComponentItem): ILayerComponentView;
  setFromAction(action: LayerAction): ILayerComponentView;
  remove(component: ILayerComponentItem): ILayerComponentView;
}
export type LayerComponentOption = {};
