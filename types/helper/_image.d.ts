import { MapSimple } from "@/interface/map";
export declare function createMapboxImageUrl(
  map: MapSimple,
  id: string,
  link: string,
  option: any
): Promise<string>;
export declare function createMapboxImage(
  map: MapSimple,
  id: string,
  link: string,
  option: any
): Promise<string>;
