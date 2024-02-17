import TabItem from "../component/tab-item.vue";
import { Layer } from "mapbox-gl";
import { Tab, TabConfig } from "@/interface/style";
declare const _default: import("vue").DefineComponent<
  {
    value: {
      required: true;
    };
    trans: {
      required: true;
    };
    mapId: {
      required: true;
    };
  },
  {
    __sfc: boolean;
    props: Readonly<
      Readonly<
        import("vue/types/common").LooseRequired<
          {
            value: unknown;
            mapId: unknown;
            trans: unknown;
          } & {}
        >
      >
    >;
    emit: (event: "input" | "update-style", ...args: any[]) => void;
    layer: import("vue").WritableComputedRef<Layer>;
    tabs_format: import("vue").ComputedRef<TabConfig[]>;
    default_value: import("vue").ComputedRef<Partial<Layer>>;
    tab_group: import("vue").Ref<
      | {
          trans?: string | undefined;
          text?: string | undefined;
          items: (
            | {
                type: "divider";
                trans?: string | undefined;
                text?: string | undefined;
                key: string;
                format?: any;
                part?: "layout" | "paint" | undefined;
                component?:
                  | {
                      content?: any;
                      label?: any;
                    }
                  | undefined;
                props?:
                  | {
                      content?: any;
                      label?: any;
                    }
                  | undefined;
              }
            | {
                trans?: string | undefined;
                text?: string | undefined;
                key: string;
                type: string;
                format?: any;
                part?: "layout" | "paint" | undefined;
                component?:
                  | {
                      content?: any;
                      label?: any;
                    }
                  | undefined;
                props?:
                  | {
                      content?: any;
                      label?: any;
                    }
                  | undefined;
              }
            | {
                unit?: string | undefined;
                type: "color";
                trans?: string | undefined;
                text?: string | undefined;
                key: string;
                format?: any;
                part?: "layout" | "paint" | undefined;
                component?:
                  | {
                      content?: any;
                      label?: any;
                    }
                  | undefined;
                props?:
                  | {
                      content?: any;
                      label?: any;
                    }
                  | undefined;
              }
            | {
                unit?: string | undefined;
                type: "unit";
                trans?: string | undefined;
                text?: string | undefined;
                key: string;
                format?: any;
                part?: "layout" | "paint" | undefined;
                component?:
                  | {
                      content?: any;
                      label?: any;
                    }
                  | undefined;
                props?:
                  | {
                      content?: any;
                      label?: any;
                    }
                  | undefined;
              }
            | {
                type: "opacity";
                trans?: string | undefined;
                text?: string | undefined;
                key: string;
                format?: any;
                part?: "layout" | "paint" | undefined;
                component?:
                  | {
                      content?: any;
                      label?: any;
                    }
                  | undefined;
                props?:
                  | {
                      content?: any;
                      label?: any;
                    }
                  | undefined;
              }
            | {
                type: "number";
                min?: number | undefined;
                max?: number | undefined;
                step?: number | undefined;
                trans?: string | undefined;
                text?: string | undefined;
                key: string;
                format?: any;
                part?: "layout" | "paint" | undefined;
                component?:
                  | {
                      content?: any;
                      label?: any;
                    }
                  | undefined;
                props?:
                  | {
                      content?: any;
                      label?: any;
                    }
                  | undefined;
              }
            | {
                type: "chose";
                menu: {
                  text?: string | undefined;
                  subtitle?: string | undefined;
                  text_trans?: string | undefined;
                  subtitle_trans?: string | undefined;
                  value: string;
                }[];
                trans?: string | undefined;
                text?: string | undefined;
                key: string;
                format?: any;
                part?: "layout" | "paint" | undefined;
                component?:
                  | {
                      content?: any;
                      label?: any;
                    }
                  | undefined;
                props?:
                  | {
                      content?: any;
                      label?: any;
                    }
                  | undefined;
              }
          )[];
        }
      | undefined
    >;
    tab: import("vue").Ref<
      | {
          type: "divider";
          trans?: string | undefined;
          text?: string | undefined;
          key: string;
          format?: any;
          part?: "layout" | "paint" | undefined;
          component?:
            | {
                content?: any;
                label?: any;
              }
            | undefined;
          props?:
            | {
                content?: any;
                label?: any;
              }
            | undefined;
        }
      | {
          trans?: string | undefined;
          text?: string | undefined;
          key: string;
          type: string;
          format?: any;
          part?: "layout" | "paint" | undefined;
          component?:
            | {
                content?: any;
                label?: any;
              }
            | undefined;
          props?:
            | {
                content?: any;
                label?: any;
              }
            | undefined;
        }
      | {
          unit?: string | undefined;
          type: "color";
          trans?: string | undefined;
          text?: string | undefined;
          key: string;
          format?: any;
          part?: "layout" | "paint" | undefined;
          component?:
            | {
                content?: any;
                label?: any;
              }
            | undefined;
          props?:
            | {
                content?: any;
                label?: any;
              }
            | undefined;
        }
      | {
          unit?: string | undefined;
          type: "unit";
          trans?: string | undefined;
          text?: string | undefined;
          key: string;
          format?: any;
          part?: "layout" | "paint" | undefined;
          component?:
            | {
                content?: any;
                label?: any;
              }
            | undefined;
          props?:
            | {
                content?: any;
                label?: any;
              }
            | undefined;
        }
      | {
          type: "opacity";
          trans?: string | undefined;
          text?: string | undefined;
          key: string;
          format?: any;
          part?: "layout" | "paint" | undefined;
          component?:
            | {
                content?: any;
                label?: any;
              }
            | undefined;
          props?:
            | {
                content?: any;
                label?: any;
              }
            | undefined;
        }
      | {
          type: "number";
          min?: number | undefined;
          max?: number | undefined;
          step?: number | undefined;
          trans?: string | undefined;
          text?: string | undefined;
          key: string;
          format?: any;
          part?: "layout" | "paint" | undefined;
          component?:
            | {
                content?: any;
                label?: any;
              }
            | undefined;
          props?:
            | {
                content?: any;
                label?: any;
              }
            | undefined;
        }
      | {
          type: "chose";
          menu: {
            text?: string | undefined;
            subtitle?: string | undefined;
            text_trans?: string | undefined;
            subtitle_trans?: string | undefined;
            value: string;
          }[];
          trans?: string | undefined;
          text?: string | undefined;
          key: string;
          format?: any;
          part?: "layout" | "paint" | undefined;
          component?:
            | {
                content?: any;
                label?: any;
              }
            | undefined;
          props?:
            | {
                content?: any;
                label?: any;
              }
            | undefined;
        }
      | undefined
    >;
    onSelectTab: (item: Tab) => void;
    onSelectTabGroup: (group: TabConfig) => void;
    emitInput: (value: any, tab: Tab, layer: any) => void;
    onChangeMinZoom: (zoom: number, layer: any) => void;
    onChangeMaxZoom: (zoom: number, layer: any) => void;
    TabItem: import("vue").VueConstructor<
      TabItem<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => TabItem<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    TabContent: import("vue").VueConstructor<
      TabItem<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => TabItem<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    Collapse: import("vue").VueConstructor<
      TabItem<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => TabItem<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    inputSlider: import("vue").VueConstructor<
      TabItem<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => TabItem<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
  },
  {},
  {},
  {},
  import("vue/types/v3-component-options").ComponentOptionsMixin,
  import("vue/types/v3-component-options").ComponentOptionsMixin,
  ("input" | "update-style")[],
  string,
  Readonly<
    import("vue").ExtractPropTypes<{
      value: {
        required: true;
      };
      trans: {
        required: true;
      };
      mapId: {
        required: true;
      };
    }>
  >,
  {}
>;
export default _default;
