import { IconItem } from "@/interface/image";
import MapImage from "@components/MapImage.vue";
declare const _default: import("vue").DefineComponent<
  {
    value: {
      required: true;
    };
    mapId: {
      type: StringConstructor;
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
            mapId: string;
          } & {}
        >
      >
    >;
    emit: (event: "input" | "change", ...args: any[]) => void;
    form: import("vue").WritableComputedRef<unknown>;
    images_convert: import("vue").ComputedRef<any>;
    onToggleImage: (image: IconItem) => void;
    MapImage: import("vue").VueConstructor<
      MapImage<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => MapImage<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    inputText: import("vue").VueConstructor<
      MapImage<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => MapImage<
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
  ("input" | "change")[],
  string,
  Readonly<
    import("vue").ExtractPropTypes<{
      value: {
        required: true;
      };
      mapId: {
        type: StringConstructor;
        required: true;
      };
    }>
  >,
  {}
>;
export default _default;
