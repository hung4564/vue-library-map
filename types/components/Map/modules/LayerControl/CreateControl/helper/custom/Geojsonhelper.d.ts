import { ConfigHelper } from "../_default";
import { GeojsonUpload } from "../../config";
export declare class ConfigGeojsonHelper extends ConfigHelper {
  get component(): import("vue").VueConstructor<
    GeojsonUpload<
      Record<string, any>,
      Record<string, any>,
      never,
      never,
      (
        event: string,
        ...args: any[]
      ) => GeojsonUpload<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        any
      >
    >
  >;
  get default_value(): any;
  validate(form: any): boolean;
  get create(): (
    form: any
  ) => import("../../../../../../../model").Layer<
    import("../../../../../../../interface/source").ISource<
      import("geojson").GeoJsonProperties
    >
  >;
}
