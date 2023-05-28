/* eslint-disable no-case-declarations */
import AParser from "./AParser";
import Papa from "papaparse";
export default class CSVParser extends AParser {
  /**
   * @param {String} data
   * @param {} options
   */
  async parse(data, options = {}) {
    let {
      crs,
      merge = "polygon",
      header_lat = "latitude",
      header_lng = "longitude"
    } = options;
    if (!data) return;
    return this.toGejson(this.toTable(data), {
      crs,
      merge,
      header_lat,
      header_lng
    });
  }
  toTable(csvString) {
    return Papa.parse(csvString, { header: true }).data;
  }
  toGejson(items, options = {}) {
    let {
      crs = "EPSG:4326",
      merge = "polygon",
      header_lat = "latitude",
      header_lng = "longitude"
    } = options;
    // Parse data
    let geojson = {
      type: "FeatureCollection",
      features: []
    };
    items.forEach((item) => {
      let lng = item[header_lng];
      let lat = item[header_lat];
      try {
        lat = Number(lat);
      } catch (e) {
        console.error(e);
      }
      try {
        lng = Number(lng);
      } catch (e) {
        console.error(e);
      }
      if (!lng || !lat) return;
      geojson.features.push({
        type: "Feature",
        properties: item,
        geometry: {
          type: "Point",
          coordinates: [lng, lat]
        }
      });
    });
    switch (merge) {
      case "lineString":
        geojson.features = [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: geojson.features.map((x) => x.geometry.coordinates)
            }
          }
        ];
        break;
      case "polygon":
        const coordinates = geojson.features.map((x) => x.geometry.coordinates);

        const firstPoint = coordinates[0];
        const lastPoint = coordinates[coordinates.length - 1];

        const isEquals =
          firstPoint[0] === lastPoint[0] &&
          firstPoint[1] === lastPoint[1] &&
          firstPoint[2] === lastPoint[2];

        if (!isEquals) coordinates.push([...firstPoint]);
        geojson.features = [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [coordinates]
            }
          }
        ];
        break;
    }
    if (crs) {
      geojson = this.formatGeojsonForDisplayingInWeb(geojson, crs);
    }

    return geojson;
  }
}
