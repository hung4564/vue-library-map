import { LayerTypeConfig } from "@/interface/style";

export const RASTER_CONFIG: LayerTypeConfig = {
  TAB: {
    type: "single",
    items: [
      {
        trans: "raster-style.setting.raster-opacity",
        key: "raster-opacity",
        type: "opacity"
      },
      {
        trans: "raster-style.setting.raster-brightness-max",
        key: "raster-brightness-max",
        type: "minMax"
      },
      {
        trans: "raster-style.setting.raster-brightness-min",
        key: "raster-brightness-min",
        type: "minMax"
      },
      {
        trans: "raster-style.setting.raster-contrast",
        key: "raster-contrast",
        type: "minMax",
        props: {
          content: {
            class: "tab-content-padding",
            min: -1,
            max: 1,
            step: 0.01
          }
        }
      },
      {
        trans: "raster-style.setting.raster-fade-duration",
        key: "raster-fade-duration",
        type: "unit",
        unit: "milliseconds"
      },
      {
        trans: "raster-style.setting.raster-hue-rotate",
        key: "raster-hue-rotate",
        type: "unit",
        unit: "degrees"
      },
      {
        trans: "raster-style.setting.raster-resampling",
        key: "raster-resampling",
        type: "chose",
        menu: [
          {
            text: "linear",
            value: "linear"
          },
          {
            text: "nearest",
            value: "nearest"
          }
        ]
      },
      {
        trans: "raster-style.setting.raster-saturation",
        key: "raster-saturation",
        type: "minMax",
        props: {
          content: {
            min: -1,
            max: 1
          }
        }
      }
    ]
  },
  DEFAULT: {
    type: "raster",
    paint: {
      "raster-brightness-max": 1,
      "raster-brightness-min": 0,
      "raster-contrast": 0,
      "raster-fade-duration": 300,
      "raster-opacity": 1,
      "raster-hue-rotate": 0,
      "raster-resampling": "linear",
      "raster-saturation": 0
    }
  }
};
