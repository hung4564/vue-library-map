import { IView } from "./view";
export interface LegendOption {
  items: any[];
  component?: any;
}
export interface LegendView extends IView {
  id: string;
  name?: string;
  config: LegendOption;
}
