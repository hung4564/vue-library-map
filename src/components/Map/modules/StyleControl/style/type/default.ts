import { ChoseTab, Tab } from "@/interface/style";
import { divColor, textAfter, textFormat } from "../label";
import {
  inputCheckbox,
  inputChoose,
  inputColorPicker,
  inputSlider,
  inputText
} from "@/components/input";

import inputImage from "../content/input-image.vue";

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
