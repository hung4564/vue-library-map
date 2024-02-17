import { Layer } from "mapbox-gl";
import { inputSelect } from "@components/input";
import SvgIcon from "@jamescoyle/vue-icon";
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
    emit: (event: "input" | "close" | "update-style", ...args: any[]) => void;
    layers: import("vue").WritableComputedRef<Layer[]>;
    onSelectTab: (layer_id: string) => void;
    onUpdateStyleLayer: (layer: Layer, layer_id: string) => void;
    onAddStyleLayer: (type: string) => void;
    onRemoveStyleLayer: (layer_id: string) => void;
    tab: import("vue").Ref<string | undefined>;
    tabs: import("vue").ComputedRef<
      {
        text: string;
        value: string;
      }[]
    >;
    current_layer: import("vue").ComputedRef<Layer | undefined>;
    path: {
      delete: string;
      create: string;
      close: string;
    };
    showAdd: import("vue").Ref<boolean>;
    setShowAdd: (value?: boolean | undefined) => void;
    onShowAddStyle: (value: boolean) => void;
    inputSelect: import("vue").VueConstructor<
      inputSelect<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => inputSelect<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    SingleStyle: import("vue").VueConstructor<
      inputSelect<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => inputSelect<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    SvgIcon: typeof SvgIcon;
    baseButton: import("vue").VueConstructor<
      inputSelect<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => inputSelect<
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
  ("input" | "close" | "update-style")[],
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
