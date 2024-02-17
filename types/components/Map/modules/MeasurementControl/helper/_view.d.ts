import { IView, IViewSetting } from "../types";
export declare class View implements IView {
  start(): void;
  view(_setting?: IViewSetting): void;
  reset(): void;
  destroy(): void;
}
