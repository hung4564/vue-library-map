export declare function initMapBaseMap(mapId: string): void;
export declare const removeBaseMap: (mapId: string) => void;
export declare const setBaseMaps: (mapId: string, baseMaps?: never[]) => void;
export declare const baseMaps: (mapId: string) => any[];
export declare const getLoading: (mapId: string) => boolean;
export declare const getCurrentBaseMaps: (mapId: string) => any;
export declare const setDefaultValueForMap: (
  mapId: string,
  titleMap: any
) => void;
export declare const setBaseMapForMap: (
  mapId: string,
  item: any
) => Promise<void>;
export declare function clearBaseMapForMap(mapId: string): void;
