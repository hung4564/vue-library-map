import { LayerTabsConfig, Tab } from "@/interface/style";

import { CIRCLE_CONFIG } from "./circle";
import { CONFIG_TABS } from "./default";
import { FILL_CONFIG } from "./fill";
import { LINE_CONFIG } from "./line";
import { Layer } from "mapbox-gl";
import { RASTER_CONFIG } from "./raster";
import { SYMBOL_CONFIG } from "./symbol";
import merge from "lodash.merge";

export const TABS: Record<string, LayerTabsConfig> = {
  circle: CIRCLE_CONFIG.TAB,
  line: LINE_CONFIG.TAB,
  fill: FILL_CONFIG.TAB,
  raster: RASTER_CONFIG.TAB,
  symbol: SYMBOL_CONFIG.TAB
};
export const DEFAULT_VALUE: Record<string, Partial<Layer>> = {
  circle: CIRCLE_CONFIG.DEFAULT,
  line: LINE_CONFIG.DEFAULT,
  fill: FILL_CONFIG.DEFAULT,
  raster: RASTER_CONFIG.DEFAULT,
  symbol: SYMBOL_CONFIG.DEFAULT
};
export * from "./default";

export function convertTabWithDefaultConfig(
  tabs: Tab[],
  default_config = CONFIG_TABS
) {
  return tabs.map((x) => {
    if (x.type === "divider") {
      return x;
    }
    const res = Object.assign(
      {},
      default_config.default,
      default_config[x.type] || {},
      x
    );
    res.props = merge(
      {},
      res.props,
      (CONFIG_TABS[x.type] || {}).props,
      x.props
    );
    return res;
  });
}
