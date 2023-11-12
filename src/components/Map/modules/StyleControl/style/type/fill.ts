import { LayerTypeConfig } from "@/interface/style";

export const FILL_CONFIG: LayerTypeConfig = {
  TAB: {
    type: "single",
    items: [
      {
        trans: "fill-style.setting.color",
        key: "fill-color",
        type: "color"
      },
      {
        trans: "fill-style.setting.opacity",
        key: "fill-opacity",
        type: "opacity"
      },
      {
        trans: "fill-style.setting.fill-antialias",
        key: "fill-antialias",
        type: "boolean"
      },
      {
        trans: "fill-style.setting.fill-outline-color",
        key: "fill-outline-color",
        type: "color"
      },
      {
        trans: "fill-style.setting.fill-pattern",
        key: "fill-pattern",
        type: "image"
      }
    ]
  },
  DEFAULT: {
    type: "fill",
    paint: {
      "fill-antialias": true,
      "fill-color": "#000000",
      "fill-opacity": 1,
      "fill-translate": [0, 0]
    }
  }
};
