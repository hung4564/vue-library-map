import { LayerTypeConfig } from "@/interface/style";

export const CIRCLE_CONFIG: LayerTypeConfig = {
  TAB: {
    type: "single",
    items: [
      {
        trans: "circle-style.setting.color",
        key: "circle-color",
        type: "color"
      },
      {
        trans: "circle-style.setting.width",
        key: "circle-radius",
        type: "unit",
        unit: "px"
      },
      {
        trans: "circle-style.setting.opacity",
        key: "circle-opacity",
        type: "opacity"
      },
      {
        trans: "circle-style.setting.blur",
        key: "circle-blur",
        type: "number"
      },
      {
        trans: "circle-style.setting.stroke-color",
        key: "circle-stroke-color",
        type: "color"
      },
      {
        trans: "circle-style.setting.stroke-width",
        key: "circle-stroke-width",
        type: "unit",
        unit: "px"
      },
      {
        trans: "circle-style.setting.stroke-opacity",
        key: "circle-stroke-opacity",
        type: "opacity"
      },
      {
        trans: "circle-style.setting.circle-pitch-alignment",
        key: "circle-pitch-alignment",
        type: "chose",
        menu: [
          {
            text: "map",
            value: "map"
          },
          {
            text: "viewport",
            value: "viewport"
          }
        ]
      },
      {
        trans: "circle-style.setting.circle-pitch-scale",
        key: "circle-pitch-scale",
        type: "chose",
        menu: [
          {
            text: "map",
            value: "map"
          },
          {
            text: "viewport",
            value: "viewport"
          }
        ]
      }
    ]
  },
  DEFAULT: {
    type: "circle",
    paint: {
      "circle-radius": 5,
      "circle-color": "#000000",
      "circle-blur": 0,
      "circle-opacity": 1,
      "circle-stroke-color": "#000000",
      "circle-stroke-width": 0,
      "circle-stroke-opacity": 1,
      "circle-pitch-alignment": "viewport",
      "circle-pitch-scale": "map"
    }
  }
};
