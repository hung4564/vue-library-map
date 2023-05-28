import CSVParser from "./parser/CSVParser";
import FileHelper from "./FileHelper";
import FileReader from "./FileReader";
import GeoJSONParser from "./parser/GeoJSONParser";

export class Reader {
  /**
   * Read GeoJson from file
   *
   * @param {File} file file need to read content as GeoJSON
   * @param {Object} [options] options for parse method
   */
  async read(file, options) {
    // get parser
    const parser = this.getParser(file);

    // load file content
    const content = await this.getFileContent(file, parser);

    // parse content as geojson
    const geojson = await parser.parse(content, options, file);

    // standardize geojson
    // const standardGeoJson = this.standardize(geojson)

    // return geojson
    return geojson;
  }
  /**
   * Get parser
   *
   * @param {File} file
   */
  getParser(file) {
    // get file extension
    const ext = FileHelper.getExtension(file);

    // check ext and return parser
    switch (ext) {
      case "geojson":
      case "json":
        return new GeoJSONParser();
      case "csv":
        return new CSVParser();
      default:
        throw new Error(`Not found parser for file type *.${ext}`);
    }
  }
  /**
   * Get file content
   *
   * @param {File} file
   */
  async getFileContent(file, parser) {
    const dataType = parser.dataType();

    if (dataType === "file") {
      return file;
    }

    const content = await FileReader.read(file, dataType);

    return content;
  }
}
