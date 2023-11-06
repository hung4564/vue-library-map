import { ChoseTab, Tab } from "@/interface/style";
import { divColor, textAfter, textFormat } from "./label";
import {
  inputCheckbox,
  inputChoose,
  inputColorPicker,
  inputSlider,
  inputText
} from "@/components/input";

import { Layer } from "mapbox-gl";
import inputImage from "./content/input-image.vue";

export const TABS: Record<string, Tab[]> = {
  circle: [
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
  ],
  line: [
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
    }
  ],
  fill: [
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
  ],
  raster: [
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
};
export const DEFAULT_VALUE: Record<string, Partial<Layer>> = {
  circle: {
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
  },
  line: {
    type: "line",
    paint: {
      "line-color": "#000000",
      "line-opacity": 1,
      "line-width": 0,
      "line-gap-width": 0,
      "line-blur": 0,
      "line-offset": 0,
      "line-translate": [0, 0],
      "line-cap": "butt",
      "line-join": "bevel",
      "line-round-limit": 0,
      "line-miter-limit": 0
    },
    layout: {}
  },
  fill: {
    type: "fill",
    paint: {
      "fill-antialias": true,
      "fill-color": "#000000",
      "fill-opacity": 1,
      "fill-translate": [0, 0],
      "fill-pattern": "none"
    }
  },
  raster: {
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
export const CONFIG_TABS: Record<string, Partial<Tab>> = {
  image: {
    component: {
      content: inputImage
    },
    props: {
      content: {
        class: "tab-content-padding"
      }
    }
  },
  color: {
    component: {
      content: inputColorPicker,
      label: divColor
    },
    props: {
      content: {
        disableAlpha: true
      }
    }
  },
  boolean: {
    component: {
      content: inputCheckbox
    },
    props: {
      content: {
        class: "tab-content-padding"
      }
    }
  },
  chose: {
    component: {
      content: inputChoose,
      label: textFormat
    },
    props: {
      content: (tab: ChoseTab) => {
        return { items: tab.menu, class: "tab-content-padding" };
      },
      label: (tab: ChoseTab) => {
        return {
          format(value: string) {
            return tab.menu.find((x) => x.value == value)?.text;
          }
        };
      }
    }
  },
  opacity: {
    component: {
      content: inputSlider,
      label: textFormat
    },
    props: {
      content: {
        class: "tab-content-padding",
        min: 0,
        max: 1,
        step: 0.01
      },
      label: {
        format: (value: number) => {
          return `${(+value * 100).toFixed(0)} %`;
        }
      }
    },
    format: (value: any) => +value
  },
  minMax: {
    component: {
      content: inputSlider,
      label: textFormat
    },
    props: {
      content: {
        class: "tab-content-padding",
        min: 0,
        max: 1,
        step: 0.01
      },
      label: {
        format: (value: number) => {
          return `${(+value).toFixed(2)}`;
        }
      }
    },
    format: (value: any) => +value
  },
  unit: {
    component: {
      content: inputText,
      label: textAfter
    },
    props: {
      content: {
        class: "tab-content-padding",
        type: "number",
        min: 0
      }
    },
    format: (value: any) => +value
  },
  default: {
    component: {
      content: inputText
    },
    props: {
      content: {
        class: "tab-content-padding"
      }
    }
  }
};
