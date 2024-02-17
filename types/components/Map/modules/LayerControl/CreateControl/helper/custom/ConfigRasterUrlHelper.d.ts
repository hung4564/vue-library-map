import { ConfigHelper } from "../_default";
import { ConfigRasterUrl } from "../../config";
export declare class ConfigRasterUrlHelper extends ConfigHelper {
  get component(): import("vue").VueConstructor<
    ConfigRasterUrl<
      Record<string, any>,
      Record<string, any>,
      never,
      never,
      (
        event: string,
        ...args: any[]
      ) => ConfigRasterUrl<
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
