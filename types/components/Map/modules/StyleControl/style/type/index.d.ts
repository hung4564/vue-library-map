import { LayerTabsConfig, Tab } from "@/interface/style";
import { Layer } from "mapbox-gl";
export declare const TABS: Record<string, LayerTabsConfig>;
export declare const DEFAULT_VALUE: Record<string, Partial<Layer>>;
export * from "./default";
export declare function convertTabWithDefaultConfig(
  tabs: Tab[],
  default_config?: Record<string, Partial<Tab>>
): import("@/interface/style").ITab[];
