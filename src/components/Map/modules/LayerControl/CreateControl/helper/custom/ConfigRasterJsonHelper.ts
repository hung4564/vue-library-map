import { ConfigHelper } from "../_default";
import { ConfigRasterJson } from "../../config";
import { createRasterJsonLayer } from "@/model/datasource/sample";

export class ConfigRasterJsonHelper extends ConfigHelper {
  get component() {
    return ConfigRasterJson;
  }
  validate(form: any) {
    if (!form.name) {
      return false;
    }
    if (!form.url) {
      return false;
    }
    return true;
  }
  get create() {
    return (form: any) => {
      return createRasterJsonLayer({
        ...form
      });
    };
  }
}
