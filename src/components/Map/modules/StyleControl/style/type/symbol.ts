import { LayerTypeConfig } from "@/interface/style";
import { SymbolLayer } from "mapbox-gl";

export const SYMBOL_CONFIG: LayerTypeConfig<SymbolLayer> = {
  TAB: {
    type: "multi",
    tabs: [
      {
        trans: "symbol-style.tab.text",
        items: [
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
        ]
      },
      {
        trans: "symbol-style.tab.icon",
        items: []
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
      "text-halo-width": 0
    },
    layout: {
      "text-field": "",
      "text-size": 16,
      "text-transform": "none",
      "text-letter-spacing": 0,
      "text-line-height": 0,
      "text-max-width": 0
    }
  }
};
