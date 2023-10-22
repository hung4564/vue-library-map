import type { GeoJSON } from "geojson";
export default abstract class BaseParser {
  dataType(): "text" | "arraybuffer" | "dataurl" | "file";
  abstract parse(
    data: ArrayBuffer | String | Uint8Array | Blob,
    options: Object,
    file: File
  ): Promise<GeoJSON>;
  abstract toGejson(data: any, options: object): Promise<GeoJSON>;
  formatGeojsonForDisplayingInWeb(geojson: GeoJSON, crsName: string): GeoJSON;
}
