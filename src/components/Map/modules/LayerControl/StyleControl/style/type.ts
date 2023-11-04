import { ChoseTab, Tab } from "@/interface/style";
import { divColor, textAfter, textFormat } from "./label";
import {
  inputChoose,
  inputColorPicker,
  inputSlider,
  inputText
} from "@/components/input";

export const TABS: { [key: string]: Tab[] } = {
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
    }
  ]
};
export const DEFAULT_VALUE: { [key: string]: any } = {
  circle: {
    paint: {
      "circle-radius": 5,
      "circle-color": "#000000",
      "circle-blur": 0,
      "circle-opacity": 1,
      "circle-stroke-color": "#000000",
      "circle-stroke-width": 0,
      "circle-stroke-opacity": 1
    }
  },
  line: {
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
  },
  fill: {
    paint: {
      "fill-color": "#000000",
      "fill-opacity": 1,
      "fill-antialias": false,
      "fill-translate": [0, 0],
      "fill-pattern": "none"
    }
  }
};
export const CONFIG_TABS: { [key: string]: any } = {
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
