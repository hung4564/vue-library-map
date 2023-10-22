import AParser from "./AParser";
export default class GeoJSONParser extends AParser {
  parse(
    data: string,
    options: GeoJSONParserOption | undefined,
    file: File
  ): Promise<any>;
  toGejson(geojson: any, options?: GeoJSONParserOption): any;
}
export interface GeoJSONParserOption {
  crs?: string;
}
