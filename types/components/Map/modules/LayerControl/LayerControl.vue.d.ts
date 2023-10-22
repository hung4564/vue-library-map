import MapControlButton from "@components/Map/control/MapControlButton.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import type { ListView, Menu, AGroup } from "@/interface/datasource/list";
import type { IView } from "@/interface/datasource/view";
import type { TLayer } from "@/model";
import type { BBox } from "geojson";
import type { LayerAction } from "@/interface/datasource/action";
import type { MapSimple } from "@/interface/map";
declare const _default: import("vue").DefineComponent<
  {
    disabledDrag: BooleanConstructor;
    disabled: BooleanConstructor;
  },
  {
    __sfc: boolean;
    VIEW_KEY_TYPE: string;
    c_mapId: import("vue").ComputedRef<any>;
    $map: any;
    callMap: (cb: any) => void;
    path: {
      icon: string;
      menu: string;
      group: {
        create: string;
      };
      deleteAll: string;
      layer: {
        create: string;
      };
    };
    show: import("vue").Ref<boolean>;
    toggleShow: (value?: boolean | undefined) => void;
    groupShow: import("vue").Ref<{}>;
    groupRef: import("vue").Ref<
      | {
          addNewGroup: (name: string) => void;
          update: (items: any[]) => void;
        }
      | undefined
    >;
    layers_select: import("vue").Ref<never[]>;
    addNewGroup: () => void;
    onRemoveGroupLayer: (group: AGroup) => void;
    views: import("vue").Ref<
      {
        name?: string | undefined;
        opacity: number;
        menus: (
          | {
              type: "divider";
            }
          | {
              id?: string | undefined;
              type: "item";
              class?: string | undefined;
              name: string;
              click?: string | Function | undefined;
              icon?: string | undefined;
              attr?: any;
            }
        )[];
        extra_buttons: (
          | {
              type: "divider";
            }
          | {
              id?: string | undefined;
              type: "item";
              class?: string | undefined;
              name: string;
              click?: string | Function | undefined;
              icon?: string | undefined;
              attr?: any;
            }
        )[];
        selected: boolean;
        metadata: any;
        color: import("@/interface/datasource/list").Color;
        config: {
          disable_delete: boolean;
          disabled_opacity: boolean;
          component: any;
        };
        index?: number | undefined;
        group?:
          | string
          | {
              name: string;
              id: string;
              children?:
                | {
                    parent?:
                      | {
                          info: {
                            [x: string]: any;
                            metadata: {
                              loading?:
                                | {
                                    valueOf: () => boolean;
                                  }
                                | undefined;
                              bounds?: BBox | undefined;
                            };
                            name?: string | undefined;
                          };
                          source: {
                            getMapboxSource: () => object;
                            bounds: BBox;
                            id: string;
                            parent?: any | undefined;
                            setParent: (
                              _parent: import("@/model").Layer<
                                import("../../../../interface/source").ISource
                              >
                            ) => void;
                          };
                          action: {
                            call: (id: string) => any;
                            menus?:
                              | (
                                  | {
                                      type: "divider";
                                    }
                                  | {
                                      id?: string | undefined;
                                      type: "item";
                                      class?: string | undefined;
                                      name: string;
                                      click?: string | Function | undefined;
                                      icon?: string | undefined;
                                      attr?: any;
                                    }
                                )[]
                              | undefined;
                            get: (id: string) => LayerAction<any>;
                            id: string;
                            parent?: any | undefined;
                            setParent: (
                              _parent: import("@/model").Layer<
                                import("../../../../interface/source").ISource
                              >
                            ) => void;
                          };
                          readonly metadata: {
                            loading?:
                              | {
                                  valueOf: () => boolean;
                                }
                              | undefined;
                            bounds?: BBox | undefined;
                          };
                          readonly name: string | undefined;
                          asProxy: () => any;
                          isHasMap: (map: MapSimple) => boolean;
                          addToMap: (
                            map: MapSimple,
                            ...args: any[]
                          ) => Promise<any[]>;
                          removeFromMap: (
                            map: MapSimple,
                            ...args: any[]
                          ) => Promise<any[]>;
                          setInfo: (
                            info: import("../../../../model/datasource/Layer").LayerInfo
                          ) => import("@/model").Layer<
                            import("../../../../interface/source").ISource
                          >;
                          setBuild: (
                            key: string,
                            build: import("@/interface/datasource/view").LayerBuildFunction<
                              IView<
                                import("../../../../interface/source").ISource
                              >,
                              any
                            >,
                            option?: {}
                          ) => import("../../../../model/datasource/part").LayerBuildContainer;
                          canBuildForView: (key: string) => boolean;
                          setView: (
                            ...args: any[]
                          ) => import("../../../../model/datasource/part").LayerViewContainer;
                          getView: (key: string) => any;
                          runBuild: (
                            key: string
                          ) =>
                            | import("@/model").Layer<
                                import("../../../../interface/source").ISource
                              >
                            | undefined;
                          setSource: (
                            source: import("../../../../interface/source").ISource
                          ) => void;
                          getSource: () => import("../../../../interface/source").ISource;
                          getAction: () => import("@/interface/datasource/action").IAction;
                          setAction: (
                            action: import("@/interface/datasource/action").IAction
                          ) => void;
                          callAction: (id: string) => any;
                          _id: string;
                          readonly id: string;
                        }
                      | undefined;
                    runAfterSetParent?: CallableFunction | undefined;
                    data_id?: string | undefined;
                    setParent: (
                      _parent: import("@/model").Layer<
                        import("../../../../interface/source").ISource
                      >
                    ) => void;
                    _id: string;
                    readonly id: string;
                  }[]
                | undefined;
            }
          | undefined;
        multi: boolean;
        addMenus: (menus: Menu[]) => ListView;
        show: any;
        id: string;
        parent?:
          | {
              info: {
                [x: string]: any;
                metadata: {
                  loading?:
                    | {
                        valueOf: () => boolean;
                      }
                    | undefined;
                  bounds?: BBox | undefined;
                };
                name?: string | undefined;
              };
              source: {
                getMapboxSource: () => object;
                bounds: BBox;
                id: string;
                parent?: any | undefined;
                setParent: (
                  _parent: import("@/model").Layer<
                    import("../../../../interface/source").ISource
                  >
                ) => void;
              };
              action: {
                call: (id: string) => any;
                menus?:
                  | (
                      | {
                          type: "divider";
                        }
                      | {
                          id?: string | undefined;
                          type: "item";
                          class?: string | undefined;
                          name: string;
                          click?: string | Function | undefined;
                          icon?: string | undefined;
                          attr?: any;
                        }
                    )[]
                  | undefined;
                get: (id: string) => LayerAction<any>;
                id: string;
                parent?: any | undefined;
                setParent: (
                  _parent: import("@/model").Layer<
                    import("../../../../interface/source").ISource
                  >
                ) => void;
              };
              readonly metadata: {
                loading?:
                  | {
                      valueOf: () => boolean;
                    }
                  | undefined;
                bounds?: BBox | undefined;
              };
              readonly name: string | undefined;
              asProxy: () => any;
              isHasMap: (map: MapSimple) => boolean;
              addToMap: (map: MapSimple, ...args: any[]) => Promise<any[]>;
              removeFromMap: (map: MapSimple, ...args: any[]) => Promise<any[]>;
              setInfo: (
                info: import("../../../../model/datasource/Layer").LayerInfo
              ) => import("@/model").Layer<
                import("../../../../interface/source").ISource
              >;
              setBuild: (
                key: string,
                build: import("@/interface/datasource/view").LayerBuildFunction<
                  IView<import("../../../../interface/source").ISource>,
                  any
                >,
                option?: {}
              ) => import("../../../../model/datasource/part").LayerBuildContainer;
              canBuildForView: (key: string) => boolean;
              setView: (
                ...args: any[]
              ) => import("../../../../model/datasource/part").LayerViewContainer;
              getView: (key: string) => any;
              runBuild: (
                key: string
              ) =>
                | import("@/model").Layer<
                    import("../../../../interface/source").ISource
                  >
                | undefined;
              setSource: (
                source: import("../../../../interface/source").ISource
              ) => void;
              getSource: () => import("../../../../interface/source").ISource;
              getAction: () => import("@/interface/datasource/action").IAction;
              setAction: (
                action: import("@/interface/datasource/action").IAction
              ) => void;
              callAction: (id: string) => any;
              _id: string;
              readonly id: string;
            }
          | undefined;
        setParent: (
          _parent: import("@/model").Layer<
            import("../../../../interface/source").ISource
          >
        ) => void;
      }[]
    >;
    onRemoveAllLayer: () => void;
    getViewFromStore: () => void;
    updateLayers: () => void;
    onUpdateLayer: (view: ListView) => void;
    onToBounds: (bounds: BBox) => void;
    onRemoveLayer: (view: ListView) => void;
    menu_context: {
      items: (
        | {
            type: "divider";
          }
        | {
            id?: string | undefined;
            type: "item";
            class?: string | undefined;
            name: string;
            click?: string | Function | undefined;
            icon?: string | undefined;
            attr?: any;
          }
      )[];
      view:
        | {
            name?: string | undefined;
            opacity: number;
            menus: (
              | {
                  type: "divider";
                }
              | {
                  id?: string | undefined;
                  type: "item";
                  class?: string | undefined;
                  name: string;
                  click?: string | Function | undefined;
                  icon?: string | undefined;
                  attr?: any;
                }
            )[];
            extra_buttons: (
              | {
                  type: "divider";
                }
              | {
                  id?: string | undefined;
                  type: "item";
                  class?: string | undefined;
                  name: string;
                  click?: string | Function | undefined;
                  icon?: string | undefined;
                  attr?: any;
                }
            )[];
            selected: boolean;
            metadata: any;
            color: import("@/interface/datasource/list").Color;
            config: {
              disable_delete: boolean;
              disabled_opacity: boolean;
              component: any;
            };
            index?: number | undefined;
            group?:
              | string
              | {
                  name: string;
                  id: string;
                  children?:
                    | {
                        parent?:
                          | {
                              info: {
                                [x: string]: any;
                                metadata: {
                                  loading?:
                                    | {
                                        valueOf: () => boolean;
                                      }
                                    | undefined;
                                  bounds?: BBox | undefined;
                                };
                                name?: string | undefined;
                              };
                              source: {
                                getMapboxSource: () => object;
                                bounds: BBox;
                                id: string;
                                parent?: any | undefined;
                                setParent: (
                                  _parent: import("@/model").Layer<
                                    import("../../../../interface/source").ISource
                                  >
                                ) => void;
                              };
                              action: {
                                call: (id: string) => any;
                                menus?:
                                  | (
                                      | {
                                          type: "divider";
                                        }
                                      | {
                                          id?: string | undefined;
                                          type: "item";
                                          class?: string | undefined;
                                          name: string;
                                          click?: string | Function | undefined;
                                          icon?: string | undefined;
                                          attr?: any;
                                        }
                                    )[]
                                  | undefined;
                                get: (id: string) => LayerAction<any>;
                                id: string;
                                parent?: any | undefined;
                                setParent: (
                                  _parent: import("@/model").Layer<
                                    import("../../../../interface/source").ISource
                                  >
                                ) => void;
                              };
                              readonly metadata: {
                                loading?:
                                  | {
                                      valueOf: () => boolean;
                                    }
                                  | undefined;
                                bounds?: BBox | undefined;
                              };
                              readonly name: string | undefined;
                              asProxy: () => any;
                              isHasMap: (map: MapSimple) => boolean;
                              addToMap: (
                                map: MapSimple,
                                ...args: any[]
                              ) => Promise<any[]>;
                              removeFromMap: (
                                map: MapSimple,
                                ...args: any[]
                              ) => Promise<any[]>;
                              setInfo: (
                                info: import("../../../../model/datasource/Layer").LayerInfo
                              ) => import("@/model").Layer<
                                import("../../../../interface/source").ISource
                              >;
                              setBuild: (
                                key: string,
                                build: import("@/interface/datasource/view").LayerBuildFunction<
                                  IView<
                                    import("../../../../interface/source").ISource
                                  >,
                                  any
                                >,
                                option?: {}
                              ) => import("../../../../model/datasource/part").LayerBuildContainer;
                              canBuildForView: (key: string) => boolean;
                              setView: (
                                ...args: any[]
                              ) => import("../../../../model/datasource/part").LayerViewContainer;
                              getView: (key: string) => any;
                              runBuild: (
                                key: string
                              ) =>
                                | import("@/model").Layer<
                                    import("../../../../interface/source").ISource
                                  >
                                | undefined;
                              setSource: (
                                source: import("../../../../interface/source").ISource
                              ) => void;
                              getSource: () => import("../../../../interface/source").ISource;
                              getAction: () => import("@/interface/datasource/action").IAction;
                              setAction: (
                                action: import("@/interface/datasource/action").IAction
                              ) => void;
                              callAction: (id: string) => any;
                              _id: string;
                              readonly id: string;
                            }
                          | undefined;
                        runAfterSetParent?: CallableFunction | undefined;
                        data_id?: string | undefined;
                        setParent: (
                          _parent: import("@/model").Layer<
                            import("../../../../interface/source").ISource
                          >
                        ) => void;
                        _id: string;
                        readonly id: string;
                      }[]
                    | undefined;
                }
              | undefined;
            multi: boolean;
            addMenus: (menus: Menu[]) => ListView;
            show: any;
            id: string;
            parent?:
              | {
                  info: {
                    [x: string]: any;
                    metadata: {
                      loading?:
                        | {
                            valueOf: () => boolean;
                          }
                        | undefined;
                      bounds?: BBox | undefined;
                    };
                    name?: string | undefined;
                  };
                  source: {
                    getMapboxSource: () => object;
                    bounds: BBox;
                    id: string;
                    parent?: any | undefined;
                    setParent: (
                      _parent: import("@/model").Layer<
                        import("../../../../interface/source").ISource
                      >
                    ) => void;
                  };
                  action: {
                    call: (id: string) => any;
                    menus?:
                      | (
                          | {
                              type: "divider";
                            }
                          | {
                              id?: string | undefined;
                              type: "item";
                              class?: string | undefined;
                              name: string;
                              click?: string | Function | undefined;
                              icon?: string | undefined;
                              attr?: any;
                            }
                        )[]
                      | undefined;
                    get: (id: string) => LayerAction<any>;
                    id: string;
                    parent?: any | undefined;
                    setParent: (
                      _parent: import("@/model").Layer<
                        import("../../../../interface/source").ISource
                      >
                    ) => void;
                  };
                  readonly metadata: {
                    loading?:
                      | {
                          valueOf: () => boolean;
                        }
                      | undefined;
                    bounds?: BBox | undefined;
                  };
                  readonly name: string | undefined;
                  asProxy: () => any;
                  isHasMap: (map: MapSimple) => boolean;
                  addToMap: (map: MapSimple, ...args: any[]) => Promise<any[]>;
                  removeFromMap: (
                    map: MapSimple,
                    ...args: any[]
                  ) => Promise<any[]>;
                  setInfo: (
                    info: import("../../../../model/datasource/Layer").LayerInfo
                  ) => import("@/model").Layer<
                    import("../../../../interface/source").ISource
                  >;
                  setBuild: (
                    key: string,
                    build: import("@/interface/datasource/view").LayerBuildFunction<
                      IView<import("../../../../interface/source").ISource>,
                      any
                    >,
                    option?: {}
                  ) => import("../../../../model/datasource/part").LayerBuildContainer;
                  canBuildForView: (key: string) => boolean;
                  setView: (
                    ...args: any[]
                  ) => import("../../../../model/datasource/part").LayerViewContainer;
                  getView: (key: string) => any;
                  runBuild: (
                    key: string
                  ) =>
                    | import("@/model").Layer<
                        import("../../../../interface/source").ISource
                      >
                    | undefined;
                  setSource: (
                    source: import("../../../../interface/source").ISource
                  ) => void;
                  getSource: () => import("../../../../interface/source").ISource;
                  getAction: () => import("@/interface/datasource/action").IAction;
                  setAction: (
                    action: import("@/interface/datasource/action").IAction
                  ) => void;
                  callAction: (id: string) => any;
                  _id: string;
                  readonly id: string;
                }
              | undefined;
            setParent: (
              _parent: import("@/model").Layer<
                import("../../../../interface/source").ISource
              >
            ) => void;
          }
        | undefined;
    };
    contextMenuRef: import("vue").Ref<
      | {
          show(event: MouseEvent, item: ListView): void;
          close(): void;
        }
      | undefined
    >;
    handleContextClick: (event: MouseEvent, item: ListView) => void;
    closeContextMenu: () => void;
    eventAddLayer: () => void;
    eventRemoveLayer: (layer: TLayer) => void;
    updateTree: () => void;
    showCreate: import("vue").Ref<boolean>;
    toggleShowCreate: (value?: boolean | undefined) => void;
    openAddLayer: () => void;
    components_show: import("vue").Ref<
      {
        component: any;
        id: string;
        attr: any;
      }[]
    >;
    onLayerAction: ({ menu, item }: { item: ListView; menu: Menu }) => void;
    onAddComponent: (menu: LayerAction, item: ListView, option: any) => void;
    onRemoveComponent: (item: LayerAction) => void;
    DraggableSidebar: import("vue").VueConstructor<
      MapControlButton<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => MapControlButton<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    MapControlButton: import("vue").VueConstructor<
      MapControlButton<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => MapControlButton<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    ModuleContainer: import("vue").VueConstructor<
      MapControlButton<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => MapControlButton<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    SvgIcon: typeof SvgIcon;
    DraggableGroupList: import("vue").VueConstructor<
      MapControlButton<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => MapControlButton<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    LayerItemContextMenu: import("vue").VueConstructor<
      MapControlButton<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => MapControlButton<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    LayerCreateControl: import("vue").VueConstructor<
      MapControlButton<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => MapControlButton<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    LayerItem: import("vue").VueConstructor<
      MapControlButton<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => MapControlButton<
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
  Readonly<
    import("vue").ExtractPropTypes<{
      disabledDrag: BooleanConstructor;
      disabled: BooleanConstructor;
    }>
  >,
  {
    disabledDrag: boolean;
    disabled: boolean;
  }
>;
export default _default;
