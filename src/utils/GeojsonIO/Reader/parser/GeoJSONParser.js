import AParser from "./AParser";

export default class GeoJSONParser extends AParser {
  parse(data, options = {}) {
    let { crs } = options;
    const geojson = JSON.parse(data);

    return Promise.resolve(this.toGejson(geojson, { crs }));
  }
  toGejson(geojson, options = {}) {
    let { crs } = options;
    if (!geojson.crs || !crs) {
      return geojson;
    }
    if (!crs && geojson.crs) {
      crs = geojson.crs.properties.name
        .replace("urn:ogc:def:crs:", "")
        .split("::")
        .join(":");
    }
    if (crs) {
      geojson = this.formatGeojsonForDisplayingInWeb(geojson, crs);
    }
    return geojson;
  }
}
