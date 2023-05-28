import { CRS, projectCoordinatesToWGS84 } from "@/utils/CRS";

export default class BaseParser {
  /**
   * Type of data pass to parse method
   * Available types: text/string, arraybuffer, base64, uint8array, blob, array, binarystring
   * More info: https://stuk.github.io/jszip/documentation/api_zipobject/async.html
   * @returns {String}
   */
  dataType() {
    return "text";
  }

  /**
   * @param {ArrayBuffer|String|Uint8Array|Blob} data data has type same as dataType() method return
   * @param {Object} options
   * @param {File} file
   */
  // eslint-disable-next-line no-unused-vars
  async parse(data, options, file) {
    throw new Error("Class not implement parse method");
  } // eslint-disable-next-line no-unused-vars
  async toGejson(data, options) {
    throw new Error("Class not implement toGeojson method");
  }
  /**
   *
   * @param {{ type: String, features: Array.<{ type: String, properties: Object, geometry: { type: String, coordinates: Number[]|Number[][]|Number[][][] } }> }} geojson
   * @param {String} projContent
   */
  formatGeojsonForDisplayingInWeb(geojson, crsName) {
    if (crsName == "EPSG:4326") return geojson;
    let projContent = getProjContent(crsName);
    if (!projContent) {
      return geojson;
    }
    for (let i = 0, len = geojson.features.length; i < len; i += 1) {
      const feature = geojson.features[i];

      // Stringify Date properties
      if (feature.properties) {
        for (const prop in feature.properties) {
          if (feature.properties[prop] instanceof Date) {
            feature.properties[prop] = feature.properties[prop].toISOString();
          }
        }
      }
      // Project Geometry Coordinates
      formatGeometryForDisplayingInWeb(feature.geometry, projContent);
    }

    return geojson;
  }
}
function getProjContent(crsName) {
  if (!CRS[crsName]) {
    console.error(`Does not support or does not need to convert ${crsName}`);
  }
  return CRS[crsName];
}
function formatGeometryForDisplayingInWeb(geometry, projContent) {
  switch (geometry.type) {
    case "Point":
      geometry.coordinates = projectCoordinatesToWGS84(
        geometry.coordinates,
        projContent
      );
      break;
    case "MultiPoint":
      geometry.coordinates = geometry.coordinates.map((point) =>
        projectCoordinatesToWGS84(point, projContent)
      );
      break;
    case "LineString":
      geometry.coordinates = geometry.coordinates.map((coor) =>
        projectCoordinatesToWGS84(coor, projContent)
      );
      break;
    case "MultiLineString":
      geometry.coordinates = geometry.coordinates.map((line) =>
        line.map((coor) => projectCoordinatesToWGS84(coor, projContent))
      );
      break;
    case "Polygon":
      geometry.coordinates = geometry.coordinates.map((line) => {
        return line.map((coor) => {
          return projectCoordinatesToWGS84(coor, projContent);
        });
      });
      break;
    case "MultiPolygon":
      geometry.coordinates = geometry.coordinates.map((polygon) =>
        polygon.map((line) =>
          line.map((coor) => projectCoordinatesToWGS84(coor, projContent))
        )
      );
      break;
    case "GeometryCollection":
      for (let i = 0, len = geometry.geometries.length; i < len; i += 1) {
        formatGeometryForDisplayingInWeb(geometry.geometries[i], projContent);
      }
      break;
    default:
      throw new Error("Does not support " + geometry.type);
  }
}
