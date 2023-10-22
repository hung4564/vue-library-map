import { IRasterOption, IRasterSource, SourceScheme } from "@/interface/map";
import { ASource } from "./ASource";
import type { BBox } from "geojson";
import { ISourceBuild } from "@/interface/source";
export declare class RasterSource extends ASource {
  option: IRasterOption;
  constructor(option?: {});
  getMapboxSource(): IRasterSource;
}
export declare class RasterSourceBuild implements ISourceBuild {
  option: IRasterOption;
  setTiles(tiles: string[]): this;
  setMaxzoom(maxzoom: number): this;
  setMinzoom(minzoom: number): this;
  setScheme(scheme: SourceScheme): this;
  setTileSize(tileSize: number): this;
  setBounds(bounds?: BBox): this;
  setUrl(url: string): this;
  build(): RasterSource;
}
