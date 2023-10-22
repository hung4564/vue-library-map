import { ConfigHelper } from "../_default";
import { GeojsonUpload } from "../../config";
import { createGeoJsonLayer } from "@/model/datasource/sample";

export class ConfigGeojsonHelper extends ConfigHelper {
  get component() {
    return GeojsonUpload;
  }
  get default_value(): any {
    return {
      type: "point",
      geojson: null
    };
  }
  validate(form: any) {
    if (!form.name) {
      return false;
    }
    if (!form.geojson) {
      return false;
    }
    if (!form.type) {
      return false;
    }
    return true;
  }
  get create() {
    return (form: any) => {
      return createGeoJsonLayer({
        ...form
      });
    };
  }
}
