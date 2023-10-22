import { ConfigHelper } from "../_default";
import { ConfigRasterUrl } from "../../config";
import { createRasterUrlLayer } from "@/model/datasource/sample";

export class ConfigRasterUrlHelper extends ConfigHelper {
  get component() {
    return ConfigRasterUrl;
  }
  get default_value(): any {
    return {
      bounds: [-180, -85.051129, 180, 85.051129],
      minzoom: 0,
      maxzoom: 24
    };
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
      return createRasterUrlLayer({
        name: form.name,
        ...form,
        tiles: [form.url]
      });
    };
  }
}
