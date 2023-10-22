import { MapSimple } from "../interface/map";
export declare const setMap: (id: string, map: MapSimple) => void;
export declare const getStoreMap: (id: string) => any;
export declare const setSideBarCount: (
  id: string,
  {
    left_count,
    right_count
  }?: {
    left_count?: number | undefined;
    right_count?: number | undefined;
  }
) => void;
export declare const getSideBarCount: (id: string) => any;
export declare const removeMap: (id: string) => void;
export declare const getMap: (
  id: string | MapSimple,
  cb?: Function | undefined
) => any;
export declare const initForMap: (
  cb_init: Function,
  cb_destroy: Function
) => void;
