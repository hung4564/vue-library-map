import ModuleContainer from "@components/Map/ModuleContainer.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { CrsItem } from "@/store/store-crs";
declare const _default: import("vue").DefineComponent<
  {},
  {
    __sfc: boolean;
    $map: any;
    c_mapId: import("vue").ComputedRef<any>;
    show: import("vue").Ref<boolean>;
    setShow: (value?: boolean | undefined) => void;
    onToggleShow: () => void;
    crs_items: import("vue").ComputedRef<CrsItem[]>;
    unit_items: {
      text: string;
      value: string;
    }[];
    path: {
      delete: string;
      plus: string;
    };
    onRemove: (item: CrsItem) => void;
    onAdd: () => void;
    mdiInboxOutline: string;
    DraggablePopup: import("vue").VueConstructor<
      ModuleContainer<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => ModuleContainer<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    ModuleContainer: import("vue").VueConstructor<
      ModuleContainer<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => ModuleContainer<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    MapControlButton: import("vue").VueConstructor<
      ModuleContainer<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => ModuleContainer<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    SvgIcon: typeof SvgIcon;
    Collapse: import("vue").VueConstructor<
      ModuleContainer<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => ModuleContainer<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    InputText: import("vue").VueConstructor<
      ModuleContainer<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => ModuleContainer<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    InputSelect: import("vue").VueConstructor<
      ModuleContainer<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => ModuleContainer<
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
  {},
  string,
  Readonly<import("vue").ExtractPropTypes<{}>>,
  {}
>;
export default _default;
