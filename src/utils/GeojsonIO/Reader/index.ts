import AParser from "./reader/AParser";
import FileHelper from "./FileHelper";
import FileReader from "./FileReader";
import GeoJSONParser from "./reader/GeoJSONParser";

export class Reader {
  async read(file: File, options: any) {
    // get parser
    const parser = this.getParser(file);

    // load file content
    const content = await this.getFileContent(file, parser);
    if (content && typeof content === "string") {
      // parse content as geojson
      const geojson = await parser.parse(content, options, file);

      // standardize geojson
      // const standardGeoJson = this.standardize(geojson)

      // return geojson
      return geojson;
    }
  }
  getParser(file: File) {
    // get file extension
    const ext = FileHelper.getExtension(file);

    // check ext and return parser
    switch (ext) {
      case "geojson":
      case "json":
        return new GeoJSONParser();
      default:
        throw new Error(`Not found parser for file type *.${ext}`);
    }
  }
  async getFileContent(file: File, parser: AParser) {
    const dataType = parser.dataType();

    if (dataType === "file") {
      return file;
    }

    const content = await FileReader.read(file, dataType);

    return content;
  }
}
