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
    active: BooleanConstructor;
  },
  {
    __sfc: boolean;
    props: Readonly<
      Readonly<
        import("vue/types/common").LooseRequired<
          {
            item: Record<string, any>;
            disabled: boolean;
            active: boolean;
          } & {
            value?: unknown;
            text?: unknown;
            default_value?: unknown;
          }
        >
      >
    >;
    attrs: import("vue").ComputedRef<any>;
  },
  {},
  {},
  {},
  import("vue/types/v3-component-options").ComponentOptionsMixin,
  import("vue/types/v3-component-options").ComponentOptionsMixin,
  {},
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
      active: BooleanConstructor;
    }>
  >,
  {
    item: Record<string, any>;
    disabled: boolean;
    active: boolean;
  }
>;
export default _default;
