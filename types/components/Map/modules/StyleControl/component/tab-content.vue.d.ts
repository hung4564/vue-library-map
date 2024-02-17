declare const _default: import("vue").DefineComponent<
  {
    value: {};
    text: {};
    item: {
      type: ObjectConstructor;
      default: () => {
        key: string;
        type: string;
        unit: string;
      };
    };
    default_value: {};
    disabled: BooleanConstructor;
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
            mapId: unknown;
            trans: unknown;
            item: Record<string, any>;
            disabled: boolean;
          } & {
            value?: unknown;
            text?: unknown;
            default_value?: unknown;
          }
        >
      >
    >;
    emit: (event: "input", ...args: any[]) => void;
    form: import("vue").WritableComputedRef<unknown>;
    attrs: import("vue").ComputedRef<any>;
    onSetDefaultValue: () => void;
  },
  {},
  {},
  {},
  import("vue/types/v3-component-options").ComponentOptionsMixin,
  import("vue/types/v3-component-options").ComponentOptionsMixin,
  "input"[],
  string,
  Readonly<
    import("vue").ExtractPropTypes<{
      value: {};
      text: {};
      item: {
        type: ObjectConstructor;
        default: () => {
          key: string;
          type: string;
          unit: string;
        };
      };
      default_value: {};
      disabled: BooleanConstructor;
      trans: {
        required: true;
      };
      mapId: {
        required: true;
      };
    }>
  >,
  {
    item: Record<string, any>;
    disabled: boolean;
  }
>;
export default _default;
