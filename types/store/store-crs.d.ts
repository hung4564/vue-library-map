export declare type CrsItem = {
  name: string;
  epsg: string | number;
  default?: boolean;
  unit: "degree" | "meter";
  proj4js?: string;
};
export declare const getCrsItems: (mapId: string) => CrsItem[];
export declare const getCrsItem: (mapId: string) => CrsItem | undefined;
export declare const setCrsItems: (
  mapId: string,
  items: CrsItem[]
) => CrsItem[];
export declare const setCrs: (mapId: string, crs: string) => void;
export declare const getCrs: (mapId: string) => string | number;
