import { LayerTypeConfig } from "@/interface/style";

export const LINE_CONFIG: LayerTypeConfig = {
  TAB: {
    type: "single",
    items: [
      {
        trans: "line-style.setting.color",
        key: "line-color",
        type: "color"
      },
      {
        trans: "line-style.setting.opacity",
        key: "line-opacity",
        type: "opacity"
      },
      {
        trans: "line-style.setting.width",
        key: "line-width",
        type: "unit",
        unit: "px"
      },
      {
        trans: "line-style.setting.pattern",
        key: "line-pattern",
        type: "image"
      },
      {
        trans: "line-style.setting.blur",
        key: "line-blur",
        type: "number"
      },
      {
        trans: "line-style.setting.cap",
        key: "line-cap",
        type: "chose",
        menu: [
          {
            text: "butt",
            value: "butt"
          },
          {
            text: "round",
            value: "round"
          },
          {
            text: "square",
            value: "square"
          }
        ]
      },
      {
        trans: "line-style.setting.join",
        key: "line-join",
        type: "chose",
        menu: [
          {
            text: "bevel",
            value: "bevel"
          },
          {
            text: "round",
            value: "round"
          },
          {
            text: "miter",
            value: "miter"
          }
        ]
      }
    ]
  },
  DEFAULT: {
    type: "line",
    paint: {
      "line-color": "#000000",
      "line-opacity": 1,
      "line-width": 0,
      "line-gap-width": 0,
      "line-blur": 0,
      "line-offset": 0,
      "line-translate": [0, 0]
    },
    layout: {
      "line-cap": "butt",
      "line-join": "bevel",
      "line-round-limit": 0,
      "line-miter-limit": 0
    }
  }
};
