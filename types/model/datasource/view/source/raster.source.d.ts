import { ISource, ISourceBuild } from "@/interface/source";
import { ASource } from "./ASource";
import type { BBox } from "geojson";
import { RasterSource as MapBoxRasterSource } from "mapbox-gl";
import { SourceScheme } from "@/interface/map";
export declare class RasterSource extends ASource implements ISource {
  option: Partial<MapBoxRasterSource>;
  constructor(option?: {});
  updateForMap(): void;
  getMapboxSource(): MapBoxRasterSource;
}
export declare class RasterSourceBuild implements ISourceBuild {
  option: Partial<MapBoxRasterSource>;
  setTiles(tiles: string[]): this;
  setMaxzoom(maxzoom: number): this;
  setMinzoom(minzoom: number): this;
  setScheme(scheme: SourceScheme): this;
  setTileSize(tileSize: number): this;
  setBounds(bounds?: BBox): this;
  setUrl(url: string): this;
  build(): RasterSource;
}
