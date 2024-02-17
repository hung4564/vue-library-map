import ModuleContainer from "@/components/Map/ModuleContainer.vue";
import { ListView } from "@/interface/datasource/list";
declare const _default: import("vue").DefineComponent<
  {},
  {
    __sfc: boolean;
    components_show: import("vue").Ref<
      {
        component: any;
        id: string;
        attr: any;
      }[]
    >;
    onRemoveComponent: (item: { id: string }) => void;
    onAddComponent: ({
      component,
      item,
      option,
      id
    }: {
      component: any;
      item: ListView;
      option: any;
      id: string;
    }) => void;
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
