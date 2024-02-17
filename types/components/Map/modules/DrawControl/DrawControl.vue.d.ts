import SvgIcon from "@jamescoyle/vue-icon";
import MapboxDraw, {
  DrawCreateEvent,
  DrawDeleteEvent,
  DrawUpdateEvent
} from "@mapbox/mapbox-gl-draw";
import ModuleContainer from "@components/Map/ModuleContainer.vue";
import { MapMouseEvent } from "mapbox-gl";
declare const _default: import("vue").DefineComponent<
  {},
  {
    __sfc: boolean;
    addEventClick: (() => void) | (() => void);
    removeEventClick: (() => void) | (() => void);
    control: MapboxDraw;
    c_mapId: import("vue").ComputedRef<any>;
    onDrawCreated: (event: DrawCreateEvent) => void;
    onDrawUpdated: (event: DrawUpdateEvent) => void;
    onDrawDeleted: (event: DrawDeleteEvent) => void;
    path: {
      add: string;
      delete: string;
      update: string;
      save: string;
      discard: string;
    };
    method: import("vue").Ref<string>;
    onSelectMethod: (value: "select" | "delete" | "create") => void;
    register_id: import("vue").ComputedRef<string | undefined>;
    onDraw: (type: string) => void;
    isActivated: import("vue").ComputedRef<boolean>;
    isShow: import("vue").ComputedRef<boolean>;
    isDraw: import("vue").ComputedRef<boolean>;
    onSave: () => void;
    onCancel: () => void;
    onMapClick: (e: MapMouseEvent) => Promise<void>;
    SvgIcon: typeof SvgIcon;
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
    MapControlGroupButton: import("vue").VueConstructor<
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
