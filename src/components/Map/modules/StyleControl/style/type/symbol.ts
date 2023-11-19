import { LayerTypeConfig, Tab } from "@/interface/style";

import { SymbolLayer } from "mapbox-gl";

const TEXT_STYLE: Tab[] = [
  {
    trans: "symbol-style.setting.text-field",
    key: "text-field",
    part: "layout",
    type: "string"
  },
  {
    trans: "symbol-style.setting.text-color",
    key: "text-color",
    type: "color"
  },
  {
    trans: "symbol-style.setting.text-opacity",
    key: "text-opacity",
    type: "opacity"
  },
  {
    trans: "symbol-style.setting.text-size",
    key: "text-size",
    part: "layout",
    type: "unit",
    unit: "px"
  },
  {
    trans: "symbol-style.setting.text-letter-spacing",
    key: "text-letter-spacing",
    part: "layout",
    type: "unit",
    unit: "em"
  },
  {
    trans: "symbol-style.setting.text-line-height",
    key: "text-line-height",
    part: "layout",
    type: "unit",
    unit: "em"
  },
  {
    trans: "symbol-style.setting.text-max-width",
    key: "text-max-width",
    part: "layout",
    type: "unit",
    unit: "em"
  },
  {
    trans: "symbol-style.setting.text-transform",
    key: "text-transform",
    part: "layout",
    type: "chose",
    menu: [
      {
        text: "none",
        value: "none"
      },
      {
        text: "uppercase",
        value: "uppercase"
      },
      {
        text: "lowercase",
        value: "lowercase"
      }
    ]
  },
  { key: "divider", type: "divider" },
  {
    trans: "symbol-style.setting.text-halo-color",
    key: "text-halo-color",
    type: "color"
  },
  {
    trans: "symbol-style.setting.text-halo-width",
    key: "text-halo-width",
    type: "unit",
    unit: "px"
  },
  {
    trans: "symbol-style.setting.text-halo-blur",
    key: "text-halo-blur",
    type: "unit",
    unit: "px"
  }
];
const ICON_STYLE: Tab[] = [
  {
    trans: "symbol-style.setting.icon-image",
    key: "icon-image",
    type: "image",
    part: "layout"
  },
  {
    trans: "symbol-style.setting.icon-opacity",
    key: "icon-opacity",
    type: "opacity"
  },
  {
    trans: "symbol-style.setting.icon-size",
    key: "icon-size",
    type: "unit",
    unit: "px",
    part: "layout"
  },
  {
    trans: "symbol-style.setting.icon-text-fit",
    key: "icon-text-fit",
    type: "chose",
    part: "layout",
    menu: [
      {
        text: "none",
        value: "none"
      },
      {
        text: "width",
        value: "width"
      },
      {
        text: "height",
        value: "height"
      },
      {
        text: "both",
        value: "both"
      }
    ]
  }
];
export const SYMBOL_CONFIG: LayerTypeConfig<SymbolLayer> = {
  TAB: {
    type: "multi",
    tabs: [
      {
        trans: "symbol-style.tab.text",
        items: TEXT_STYLE
      },
      {
        trans: "symbol-style.tab.icon",
        items: ICON_STYLE
      },
      {
        trans: "symbol-style.tab.position",
        items: []
      },
      {
        trans: "symbol-style.tab.placement",
        items: []
      }
    ]
  },
  DEFAULT: {
    type: "symbol",
    paint: {
      "text-color": "#000",
      "text-opacity": 1,
      "text-halo-blur": 0,
      "text-halo-color": "#000",
      "text-halo-width": 0,
      "icon-opacity": 1
    },
    layout: {
      "icon-size": 1,
      "icon-text-fit-padding": [0, 0, 0, 0],
      "icon-text-fit": "both",
      "text-field": "",
      "text-size": 16,
      "text-transform": "none",
      "text-letter-spacing": 0,
      "text-line-height": 0,
      "text-max-width": 0
    }
  }
};
