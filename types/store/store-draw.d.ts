import type { Feature, GeoJSON } from "geojson";
import { Layer } from "@/model";
export declare type DrawSaveFcParams = {
  added: Record<string, Feature>;
  updated: Record<string, Feature>;
  deleted: Record<string, Feature>;
  geojson: GeoJSON;
};
export declare type DrawSaveFc = (params: DrawSaveFcParams) => void;
export declare const initDrawControl: (map_id: string, control: any) => void;
export declare const activateDraw: (
  map_id: string,
  register_id: string,
  geojson?: GeoJSON | undefined
) => void;
export declare const deactivateDraw: (map_id: string) => void;
export declare const draw: (
  map_id: string,
  register_id: string,
  type: string,
  callback?: DrawSaveFc | undefined,
  options?: any
) => void;
export declare const saveDraw: (
  map_id: string,
  register_id: string,
  callback?: DrawSaveFc | undefined
) => void;
export declare function cancelDraw(map_id: string): void;
export declare const clearDraw: (map_id: string) => void;
export declare function setFeature(
  map_id: string,
  type: "added" | "updated" | "deleted",
  feature: Feature
): void;
export declare function checkAndCallDone(
  map_id: string,
  register_id: string
): void;
export declare function callDraw(map_id: string, layer: Layer): void;
export declare const getDrawIsActivated: (map_id: string) => boolean;
export declare const getDrawIsRegisterId: (
  map_id: string
) => string | undefined;
export declare const getDrawIsShow: (map_id: string) => boolean;
export declare const getDrawAction: (map_id: string) => {
  addFeatures?: ((features: Feature[]) => Promise<boolean | void>) | undefined;
  updateFeatures?:
    | ((features: Feature[]) => Promise<boolean | void>)
    | undefined;
  deleteFeatures?:
    | ((features: Feature[]) => Promise<boolean | void>)
    | undefined;
  getFeatures?: ((point: [number, number]) => Promise<Feature[]>) | undefined;
  reset?: (() => Promise<boolean | void>) | undefined;
};
