import { ConfigHelper } from "../_default";
import { ConfigRasterJson } from "../../config";
export declare class ConfigRasterJsonHelper extends ConfigHelper {
  get component(): import("vue").VueConstructor<
    ConfigRasterJson<
      Record<string, any>,
      Record<string, any>,
      never,
      never,
      (
        event: string,
        ...args: any[]
      ) => ConfigRasterJson<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        any
      >
    >
  >;
  validate(form: any): boolean;
  get create(): (
    form: any
  ) => import("../../../../../../../model").Layer<
    import("../../../../../../../interface/source").ISource
  >;
}
