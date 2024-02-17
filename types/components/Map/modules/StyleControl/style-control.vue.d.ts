import ModuleContainer from "@/components/Map/ModuleContainer.vue";
import { Layer } from "@/model";
import { MapSimple } from "@/interface/map";
declare const _default: import("vue").DefineComponent<
  {},
  {
    __sfc: boolean;
    show: import("vue").Ref<boolean>;
    toggleShow: (value?: boolean | undefined) => void;
    c_mapId: import("vue").ComputedRef<any>;
    callMap: (cb: any) => void;
    trans: any;
    layer: import("vue").Ref<any>;
    layer_map: import("vue").Ref<
      | {
          readonly id: string;
          readonly metadata: {
            bounds?: number[] | undefined;
          };
          getBeforeId: () => string;
          getAllLayerIds: () => string[];
          addToMap: (map: MapSimple, beforeId: string) => void;
          removeFromMap: (map: MapSimple) => void;
          moveLayer: (map: MapSimple, beforeId: string) => void;
          toggleShow: (map: MapSimple, show: boolean) => void;
          setOpacity: (map: MapSimple, opacity: number) => void;
          getValue: () => any;
          getComponentUpdate: () => any;
          updateValue: (map: MapSimple, value: any) => void;
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
                    bounds?: import("geojson").BBox | undefined;
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
                  bounds: import("geojson").BBox;
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
                  bounds?: import("geojson").BBox | undefined;
                };
                readonly name: string | undefined;
                asProxy: () => any;
                isHasMap: (map: MapSimple) => boolean;
                addToMap: (map: MapSimple, ...args: any[]) => Promise<void>;
                removeFromMap: (
                  map: MapSimple,
                  ...args: any[]
                ) => Promise<void>;
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
                  build: import("../../../../interface/datasource/view").LayerBuildFunction<
                    import("../../../../interface/datasource/view").IView,
                    any
                  >,
                  option?: {}
                ) => import("../../../../model/datasource/part").LayerBuildContainer;
                canBuildForView: (key: string) => boolean;
                setView: (
                  ...args: any[]
                ) => import("../../../../model/datasource/part").LayerViewContainer;
                getView: <
                  T extends import("@/model/datasource/type").TYPE_BUILD
                >(
                  key: T
                ) => import("@/model/datasource/type").TYPE_VIEW<T>;
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
        }
      | undefined
    >;
    layer_map_component: import("vue").ComputedRef<any>;
    open: (_layer: Layer) => void;
    close: () => void;
    onClose: () => void;
    onUpdateStyle: (value: any) => void;
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
    DraggableSidebar: import("vue").VueConstructor<
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
