export interface IMapSingleLayerOption extends IMapOption {
  source: any;
  layer: any;
}
export interface IMapMultiLayerOption extends IMapOption {
  source: any;
  layers: any[];
}

export interface IMapOption {
  metadata: {
    bounds?: number[];
  };
  id: string;
}
