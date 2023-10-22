import AParser from "./reader/AParser";
import GeoJSONParser from "./reader/GeoJSONParser";
export declare class Reader {
  read(file: File, options: any): Promise<any>;
  getParser(file: File): GeoJSONParser;
  getFileContent(
    file: File,
    parser: AParser
  ): Promise<string | ArrayBuffer | File | null>;
}
