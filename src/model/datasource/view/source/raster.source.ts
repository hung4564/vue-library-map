import { ISource, ISourceBuild } from "@/interface/source";
import { MapSimple, SourceScheme } from "@/interface/map";

import { ASource } from "./ASource";
import type { BBox } from "geojson";
import { RasterSource as MapBoxRasterSource } from "mapbox-gl";

export class RasterSource extends ASource implements ISource {
  public option: Partial<MapBoxRasterSource>;
  constructor(option = {}) {
    super();
    this.option = option;
    if (this.option.bounds) {
      this.setBounds(this.option.bounds as [number, number, number, number]);
    }
  }
  updateForMap(map: MapSimple) {}
  getMapboxSource(): MapBoxRasterSource {
    return {
      type: "raster",
      ...this.option,
      bounds: this.bounds || [-180, -85.051129, 180, 85.051129]
    };
  }
}

export class RasterSourceBuild implements ISourceBuild {
  option: Partial<MapBoxRasterSource> = {};
  setTiles(tiles: string[]) {
    this.option.tiles = tiles;
    return this;
  }
  setMaxzoom(maxzoom: number) {
    this.option.maxzoom = maxzoom;
    return this;
  }
  setMinzoom(minzoom: number) {
    this.option.minzoom = minzoom;
    return this;
  }
  setScheme(scheme: SourceScheme) {
    this.option.scheme = scheme;
    return this;
  }
  setTileSize(tileSize: number) {
    this.option.tileSize = tileSize;
    return this;
  }
  setBounds(bounds?: BBox) {
    this.option.bounds = bounds;
    return this;
  }
  setUrl(url: string) {
    this.option.url = url;
    return this;
  }
  build() {
    return new RasterSource(this.option);
  }
}
