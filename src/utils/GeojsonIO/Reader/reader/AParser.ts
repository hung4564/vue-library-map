/* eslint-disable no-unused-vars */
import type { GeoJSON } from "geojson";
export default abstract class BaseParser {
  dataType(): "text" | "arraybuffer" | "dataurl" | "file" {
    return "text";
  }

  abstract parse(
    data: ArrayBuffer | String | Uint8Array | Blob,
    options: Object,
    file: File
  ): Promise<GeoJSON>;
  abstract toGejson(data: any, options: object): Promise<GeoJSON>;
  formatGeojsonForDisplayingInWeb(geojson: GeoJSON, crsName: string): GeoJSON {
    if (crsName == "EPSG:4326") return geojson;
    const projContent = getProjContent(crsName);
    if (!projContent) {
      return geojson;
    }

    return geojson;
  }
}
const CRS: { [key: string]: any } = {};
function getProjContent(crsName: string) {
  if (!CRS[crsName]) {
    console.error(`Does not support or does not need to convert ${crsName}`);
  }
  return CRS[crsName];
}
