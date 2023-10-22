import { IView, IViewSetting } from "../types";
export declare class View implements IView {
  start(): void;
  view(setting?: IViewSetting): void;
  reset(): void;
  destroy(): void;
}
