import type { BBox } from "geojson";
import DraggableGroupList from "@/components/DraggableList/draggable-group-list.vue";
import type { AGroup, ListView, Menu } from "@/interface/datasource/list";
import type { IView } from "@/interface/datasource/view";
import type { MapSimple } from "@/interface/map";
import type { Layer, TLayer } from "@/model";
import SvgIcon from "@jamescoyle/vue-icon";
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
              click?:
                | ((
                    layer: Layer<
                      import("../../../../interface/source").ISource<
                        import("geojson").GeoJsonProperties
                      >
                    >,
                    map_id: string
                  ) => any)
                | undefined;
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
              click?:
                | ((
                    layer: Layer<
                      import("../../../../interface/source").ISource<
                        import("geojson").GeoJsonProperties
                      >
                    >,
                    map_id: string
                  ) => any)
                | undefined;
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
                            id: string;
                            parent?: any | undefined;
                            setParent: (
                              _parent: Layer<
                                import("../../../../interface/source").ISource<
                                  import("geojson").GeoJsonProperties
                                >
                              >
                            ) => void;
                            setData: (
                              data?:
                                | string
                                | import("geojson").FeatureCollection<
                                    import("geojson").Geometry,
                                    import("geojson").GeoJsonProperties
                                  >
                                | undefined
                            ) => void;
                            getAll: () =>
                              | import("geojson").FeatureCollection<
                                  import("geojson").Geometry,
                                  import("geojson").GeoJsonProperties
                                >
                              | undefined;
                            addFeatures?:
                              | ((
                                  features: import("geojson").Feature<
                                    import("geojson").Geometry,
                                    import("geojson").GeoJsonProperties
                                  >[]
                                ) => Promise<boolean | void>)
                              | undefined;
                            updateFeatures?:
                              | ((
                                  features: import("geojson").Feature<
                                    import("geojson").Geometry,
                                    import("geojson").GeoJsonProperties
                                  >[]
                                ) => Promise<boolean | void>)
                              | undefined;
                            deleteFeatures?:
                              | ((
                                  features: import("geojson").Feature<
                                    import("geojson").Geometry,
                                    import("geojson").GeoJsonProperties
                                  >[]
                                ) => Promise<boolean | void>)
                              | undefined;
                            getFeatures?:
                              | ((
                                  point: [number, number]
                                ) => Promise<
                                  import("geojson").Feature<
                                    import("geojson").Geometry,
                                    import("geojson").GeoJsonProperties
                                  >[]
                                >)
                              | undefined;
                            getMapboxSource: () => object;
                            updateForMap: (map: MapSimple) => void;
                            addToMap: (map: MapSimple) => void;
                            removeFromMap: (map: MapSimple) => void;
                            bounds: BBox;
                          };
                          action: {
                            call: (id: string, map_id: string) => any;
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
                                      click?:
                                        | ((
                                            layer: Layer<
                                              import("../../../../interface/source").ISource<
                                                import("geojson").GeoJsonProperties
                                              >
                                            >,
                                            map_id: string
                                          ) => any)
                                        | undefined;
                                      icon?: string | undefined;
                                      attr?: any;
                                    }
                                )[]
                              | undefined;
                            get: (
                              id: string
                            ) => import("../../../../interface/datasource/action").LayerAction;
                            addActions: (
                              actions: import("../../../../interface/datasource/action").LayerAction[]
                            ) => import("../../../../interface/datasource/action").LayerActionView;
                            addAction: (
                              action: import("../../../../interface/datasource/action").LayerAction
                            ) => import("../../../../interface/datasource/action").LayerActionView;
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
                          ) => Promise<void>;
                          removeFromMap: (
                            map: MapSimple,
                            ...args: any[]
                          ) => Promise<void>;
                          updateForMap: (
                            map: MapSimple,
                            ...args: any[]
                          ) => Promise<void>;
                          setInfo: (
                            info: import("../../../../model/datasource/Layer").LayerInfo
                          ) => Layer<
                            import("../../../../interface/source").ISource<
                              import("geojson").GeoJsonProperties
                            >
                          >;
                          setBuild: (
                            key: string,
                            build: import("@/interface/datasource/view").LayerBuildFunction<
                              IView,
                              any
                            >,
                            option?: {}
                          ) => import("../../../../model/datasource/part").LayerBuildContainer;
                          canBuildForView: (key: string) => boolean;
                          setView: (
                            ...args: any[]
                          ) => import("../../../../model/datasource/part").LayerViewContainer;
                          getView: <
                            T extends import("../../../../model/datasource/type").TYPE_BUILD
                          >(
                            key: T
                          ) => import("../../../../model/datasource/type").TYPE_VIEW<T>;
                          runBuild: (
                            key: string
                          ) =>
                            | Layer<
                                import("../../../../interface/source").ISource<
                                  import("geojson").GeoJsonProperties
                                >
                              >
                            | undefined;
                          setSource: (
                            source: import("../../../../interface/source").ISource<
                              import("geojson").GeoJsonProperties
                            >
                          ) => void;
                          getSource: () => import("../../../../interface/source").ISource<
                            import("geojson").GeoJsonProperties
                          >;
                          getAction: () => import("../../../../interface/datasource/action").IAction;
                          setAction: (
                            action: import("../../../../interface/datasource/action").IAction
                          ) => void;
                          callAction: (id: string, map_id: string) => any;
                          _id: string;
                          readonly id: string;
                        }
                      | undefined;
                    runAfterSetParent?: CallableFunction | undefined;
                    data_id?: string | undefined;
                    setParent: (
                      _parent: Layer<
                        import("../../../../interface/source").ISource<
                          import("geojson").GeoJsonProperties
                        >
                      >
                    ) => void;
                    _id: string;
                    readonly id: string;
                  }[]
                | undefined;
            }
          | undefined;
        multi: boolean;
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
                id: string;
                parent?: any | undefined;
                setParent: (
                  _parent: Layer<
                    import("../../../../interface/source").ISource<
                      import("geojson").GeoJsonProperties
                    >
                  >
                ) => void;
                setData: (
                  data?:
                    | string
                    | import("geojson").FeatureCollection<
                        import("geojson").Geometry,
                        import("geojson").GeoJsonProperties
                      >
                    | undefined
                ) => void;
                getAll: () =>
                  | import("geojson").FeatureCollection<
                      import("geojson").Geometry,
                      import("geojson").GeoJsonProperties
                    >
                  | undefined;
                addFeatures?:
                  | ((
                      features: import("geojson").Feature<
                        import("geojson").Geometry,
                        import("geojson").GeoJsonProperties
                      >[]
                    ) => Promise<boolean | void>)
                  | undefined;
                updateFeatures?:
                  | ((
                      features: import("geojson").Feature<
                        import("geojson").Geometry,
                        import("geojson").GeoJsonProperties
                      >[]
                    ) => Promise<boolean | void>)
                  | undefined;
                deleteFeatures?:
                  | ((
                      features: import("geojson").Feature<
                        import("geojson").Geometry,
                        import("geojson").GeoJsonProperties
                      >[]
                    ) => Promise<boolean | void>)
                  | undefined;
                getFeatures?:
                  | ((
                      point: [number, number]
                    ) => Promise<
                      import("geojson").Feature<
                        import("geojson").Geometry,
                        import("geojson").GeoJsonProperties
                      >[]
                    >)
                  | undefined;
                getMapboxSource: () => object;
                updateForMap: (map: MapSimple) => void;
                addToMap: (map: MapSimple) => void;
                removeFromMap: (map: MapSimple) => void;
                bounds: BBox;
              };
              action: {
                call: (id: string, map_id: string) => any;
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
                          click?:
                            | ((
                                layer: Layer<
                                  import("../../../../interface/source").ISource<
                                    import("geojson").GeoJsonProperties
                                  >
                                >,
                                map_id: string
                              ) => any)
                            | undefined;
                          icon?: string | undefined;
                          attr?: any;
                        }
                    )[]
                  | undefined;
                get: (
                  id: string
                ) => import("../../../../interface/datasource/action").LayerAction;
                addActions: (
                  actions: import("../../../../interface/datasource/action").LayerAction[]
                ) => import("../../../../interface/datasource/action").LayerActionView;
                addAction: (
                  action: import("../../../../interface/datasource/action").LayerAction
                ) => import("../../../../interface/datasource/action").LayerActionView;
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
              addToMap: (map: MapSimple, ...args: any[]) => Promise<void>;
              removeFromMap: (map: MapSimple, ...args: any[]) => Promise<void>;
              updateForMap: (map: MapSimple, ...args: any[]) => Promise<void>;
              setInfo: (
                info: import("../../../../model/datasource/Layer").LayerInfo
              ) => Layer<
                import("../../../../interface/source").ISource<
                  import("geojson").GeoJsonProperties
                >
              >;
              setBuild: (
                key: string,
                build: import("@/interface/datasource/view").LayerBuildFunction<
                  IView,
                  any
                >,
                option?: {}
              ) => import("../../../../model/datasource/part").LayerBuildContainer;
              canBuildForView: (key: string) => boolean;
              setView: (
                ...args: any[]
              ) => import("../../../../model/datasource/part").LayerViewContainer;
              getView: <
                T extends import("../../../../model/datasource/type").TYPE_BUILD
              >(
                key: T
              ) => import("../../../../model/datasource/type").TYPE_VIEW<T>;
              runBuild: (
                key: string
              ) =>
                | Layer<
                    import("../../../../interface/source").ISource<
                      import("geojson").GeoJsonProperties
                    >
                  >
                | undefined;
              setSource: (
                source: import("../../../../interface/source").ISource<
                  import("geojson").GeoJsonProperties
                >
              ) => void;
              getSource: () => import("../../../../interface/source").ISource<
                import("geojson").GeoJsonProperties
              >;
              getAction: () => import("../../../../interface/datasource/action").IAction;
              setAction: (
                action: import("../../../../interface/datasource/action").IAction
              ) => void;
              callAction: (id: string, map_id: string) => any;
              _id: string;
              readonly id: string;
            }
          | undefined;
        setParent: (
          _parent: Layer<
            import("../../../../interface/source").ISource<
              import("geojson").GeoJsonProperties
            >
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
            click?:
              | ((
                  layer: Layer<
                    import("../../../../interface/source").ISource<
                      import("geojson").GeoJsonProperties
                    >
                  >,
                  map_id: string
                ) => any)
              | undefined;
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
                  click?:
                    | ((
                        layer: Layer<
                          import("../../../../interface/source").ISource<
                            import("geojson").GeoJsonProperties
                          >
                        >,
                        map_id: string
                      ) => any)
                    | undefined;
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
                  click?:
                    | ((
                        layer: Layer<
                          import("../../../../interface/source").ISource<
                            import("geojson").GeoJsonProperties
                          >
                        >,
                        map_id: string
                      ) => any)
                    | undefined;
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
                                id: string;
                                parent?: any | undefined;
                                setParent: (
                                  _parent: Layer<
                                    import("../../../../interface/source").ISource<
                                      import("geojson").GeoJsonProperties
                                    >
                                  >
                                ) => void;
                                setData: (
                                  data?:
                                    | string
                                    | import("geojson").FeatureCollection<
                                        import("geojson").Geometry,
                                        import("geojson").GeoJsonProperties
                                      >
                                    | undefined
                                ) => void;
                                getAll: () =>
                                  | import("geojson").FeatureCollection<
                                      import("geojson").Geometry,
                                      import("geojson").GeoJsonProperties
                                    >
                                  | undefined;
                                addFeatures?:
                                  | ((
                                      features: import("geojson").Feature<
                                        import("geojson").Geometry,
                                        import("geojson").GeoJsonProperties
                                      >[]
                                    ) => Promise<boolean | void>)
                                  | undefined;
                                updateFeatures?:
                                  | ((
                                      features: import("geojson").Feature<
                                        import("geojson").Geometry,
                                        import("geojson").GeoJsonProperties
                                      >[]
                                    ) => Promise<boolean | void>)
                                  | undefined;
                                deleteFeatures?:
                                  | ((
                                      features: import("geojson").Feature<
                                        import("geojson").Geometry,
                                        import("geojson").GeoJsonProperties
                                      >[]
                                    ) => Promise<boolean | void>)
                                  | undefined;
                                getFeatures?:
                                  | ((
                                      point: [number, number]
                                    ) => Promise<
                                      import("geojson").Feature<
                                        import("geojson").Geometry,
                                        import("geojson").GeoJsonProperties
                                      >[]
                                    >)
                                  | undefined;
                                getMapboxSource: () => object;
                                updateForMap: (map: MapSimple) => void;
                                addToMap: (map: MapSimple) => void;
                                removeFromMap: (map: MapSimple) => void;
                                bounds: BBox;
                              };
                              action: {
                                call: (id: string, map_id: string) => any;
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
                                          click?:
                                            | ((
                                                layer: Layer<
                                                  import("../../../../interface/source").ISource<
                                                    import("geojson").GeoJsonProperties
                                                  >
                                                >,
                                                map_id: string
                                              ) => any)
                                            | undefined;
                                          icon?: string | undefined;
                                          attr?: any;
                                        }
                                    )[]
                                  | undefined;
                                get: (
                                  id: string
                                ) => import("../../../../interface/datasource/action").LayerAction;
                                addActions: (
                                  actions: import("../../../../interface/datasource/action").LayerAction[]
                                ) => import("../../../../interface/datasource/action").LayerActionView;
                                addAction: (
                                  action: import("../../../../interface/datasource/action").LayerAction
                                ) => import("../../../../interface/datasource/action").LayerActionView;
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
                              ) => Promise<void>;
                              removeFromMap: (
                                map: MapSimple,
                                ...args: any[]
                              ) => Promise<void>;
                              updateForMap: (
                                map: MapSimple,
                                ...args: any[]
                              ) => Promise<void>;
                              setInfo: (
                                info: import("../../../../model/datasource/Layer").LayerInfo
                              ) => Layer<
                                import("../../../../interface/source").ISource<
                                  import("geojson").GeoJsonProperties
                                >
                              >;
                              setBuild: (
                                key: string,
                                build: import("@/interface/datasource/view").LayerBuildFunction<
                                  IView,
                                  any
                                >,
                                option?: {}
                              ) => import("../../../../model/datasource/part").LayerBuildContainer;
                              canBuildForView: (key: string) => boolean;
                              setView: (
                                ...args: any[]
                              ) => import("../../../../model/datasource/part").LayerViewContainer;
                              getView: <
                                T extends import("../../../../model/datasource/type").TYPE_BUILD
                              >(
                                key: T
                              ) => import("../../../../model/datasource/type").TYPE_VIEW<T>;
                              runBuild: (
                                key: string
                              ) =>
                                | Layer<
                                    import("../../../../interface/source").ISource<
                                      import("geojson").GeoJsonProperties
                                    >
                                  >
                                | undefined;
                              setSource: (
                                source: import("../../../../interface/source").ISource<
                                  import("geojson").GeoJsonProperties
                                >
                              ) => void;
                              getSource: () => import("../../../../interface/source").ISource<
                                import("geojson").GeoJsonProperties
                              >;
                              getAction: () => import("../../../../interface/datasource/action").IAction;
                              setAction: (
                                action: import("../../../../interface/datasource/action").IAction
                              ) => void;
                              callAction: (id: string, map_id: string) => any;
                              _id: string;
                              readonly id: string;
                            }
                          | undefined;
                        runAfterSetParent?: CallableFunction | undefined;
                        data_id?: string | undefined;
                        setParent: (
                          _parent: Layer<
                            import("../../../../interface/source").ISource<
                              import("geojson").GeoJsonProperties
                            >
                          >
                        ) => void;
                        _id: string;
                        readonly id: string;
                      }[]
                    | undefined;
                }
              | undefined;
            multi: boolean;
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
                    id: string;
                    parent?: any | undefined;
                    setParent: (
                      _parent: Layer<
                        import("../../../../interface/source").ISource<
                          import("geojson").GeoJsonProperties
                        >
                      >
                    ) => void;
                    setData: (
                      data?:
                        | string
                        | import("geojson").FeatureCollection<
                            import("geojson").Geometry,
                            import("geojson").GeoJsonProperties
                          >
                        | undefined
                    ) => void;
                    getAll: () =>
                      | import("geojson").FeatureCollection<
                          import("geojson").Geometry,
                          import("geojson").GeoJsonProperties
                        >
                      | undefined;
                    addFeatures?:
                      | ((
                          features: import("geojson").Feature<
                            import("geojson").Geometry,
                            import("geojson").GeoJsonProperties
                          >[]
                        ) => Promise<boolean | void>)
                      | undefined;
                    updateFeatures?:
                      | ((
                          features: import("geojson").Feature<
                            import("geojson").Geometry,
                            import("geojson").GeoJsonProperties
                          >[]
                        ) => Promise<boolean | void>)
                      | undefined;
                    deleteFeatures?:
                      | ((
                          features: import("geojson").Feature<
                            import("geojson").Geometry,
                            import("geojson").GeoJsonProperties
                          >[]
                        ) => Promise<boolean | void>)
                      | undefined;
                    getFeatures?:
                      | ((
                          point: [number, number]
                        ) => Promise<
                          import("geojson").Feature<
                            import("geojson").Geometry,
                            import("geojson").GeoJsonProperties
                          >[]
                        >)
                      | undefined;
                    getMapboxSource: () => object;
                    updateForMap: (map: MapSimple) => void;
                    addToMap: (map: MapSimple) => void;
                    removeFromMap: (map: MapSimple) => void;
                    bounds: BBox;
                  };
                  action: {
                    call: (id: string, map_id: string) => any;
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
                              click?:
                                | ((
                                    layer: Layer<
                                      import("../../../../interface/source").ISource<
                                        import("geojson").GeoJsonProperties
                                      >
                                    >,
                                    map_id: string
                                  ) => any)
                                | undefined;
                              icon?: string | undefined;
                              attr?: any;
                            }
                        )[]
                      | undefined;
                    get: (
                      id: string
                    ) => import("../../../../interface/datasource/action").LayerAction;
                    addActions: (
                      actions: import("../../../../interface/datasource/action").LayerAction[]
                    ) => import("../../../../interface/datasource/action").LayerActionView;
                    addAction: (
                      action: import("../../../../interface/datasource/action").LayerAction
                    ) => import("../../../../interface/datasource/action").LayerActionView;
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
                  addToMap: (map: MapSimple, ...args: any[]) => Promise<void>;
                  removeFromMap: (
                    map: MapSimple,
                    ...args: any[]
                  ) => Promise<void>;
                  updateForMap: (
                    map: MapSimple,
                    ...args: any[]
                  ) => Promise<void>;
                  setInfo: (
                    info: import("../../../../model/datasource/Layer").LayerInfo
                  ) => Layer<
                    import("../../../../interface/source").ISource<
                      import("geojson").GeoJsonProperties
                    >
                  >;
                  setBuild: (
                    key: string,
                    build: import("@/interface/datasource/view").LayerBuildFunction<
                      IView,
                      any
                    >,
                    option?: {}
                  ) => import("../../../../model/datasource/part").LayerBuildContainer;
                  canBuildForView: (key: string) => boolean;
                  setView: (
                    ...args: any[]
                  ) => import("../../../../model/datasource/part").LayerViewContainer;
                  getView: <
                    T extends import("../../../../model/datasource/type").TYPE_BUILD
                  >(
                    key: T
                  ) => import("../../../../model/datasource/type").TYPE_VIEW<T>;
                  runBuild: (
                    key: string
                  ) =>
                    | Layer<
                        import("../../../../interface/source").ISource<
                          import("geojson").GeoJsonProperties
                        >
                      >
                    | undefined;
                  setSource: (
                    source: import("../../../../interface/source").ISource<
                      import("geojson").GeoJsonProperties
                    >
                  ) => void;
                  getSource: () => import("../../../../interface/source").ISource<
                    import("geojson").GeoJsonProperties
                  >;
                  getAction: () => import("../../../../interface/datasource/action").IAction;
                  setAction: (
                    action: import("../../../../interface/datasource/action").IAction
                  ) => void;
                  callAction: (id: string, map_id: string) => any;
                  _id: string;
                  readonly id: string;
                }
              | undefined;
            setParent: (
              _parent: Layer<
                import("../../../../interface/source").ISource<
                  import("geojson").GeoJsonProperties
                >
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
    styleControlRef: import("vue").Ref<
      | {
          open(layer: Layer): void;
          close(): void;
        }
      | undefined
    >;
    layer_action: {
      [key: string]: Function;
    };
    onLayerAction: ({ menu, item }: { item: ListView; menu: Menu }) => void;
    DraggableGroupList: import("vue").VueConstructor<
      DraggableGroupList<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => DraggableGroupList<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    ModuleContainer: import("vue").VueConstructor<
      DraggableGroupList<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => DraggableGroupList<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    LayerComponent: import("vue").VueConstructor<
      DraggableGroupList<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => DraggableGroupList<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    MapControlButton: import("vue").VueConstructor<
      DraggableGroupList<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => DraggableGroupList<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    DraggableSidebar: import("vue").VueConstructor<
      DraggableGroupList<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => DraggableGroupList<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    SvgIcon: typeof SvgIcon;
    BaseMapCard: import("vue").VueConstructor<
      DraggableGroupList<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => DraggableGroupList<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    LayerCreateControl: import("vue").VueConstructor<
      DraggableGroupList<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => DraggableGroupList<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    LayerItem: import("vue").VueConstructor<
      DraggableGroupList<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => DraggableGroupList<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    LayerItemContextMenu: import("vue").VueConstructor<
      DraggableGroupList<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => DraggableGroupList<
          Record<string, any>,
          Record<string, any>,
          never,
          never,
          any
        >
      >
    >;
    StyleControl: import("vue").VueConstructor<
      DraggableGroupList<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => DraggableGroupList<
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
