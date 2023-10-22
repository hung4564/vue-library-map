import { IView } from "./view";

export interface IdentifyOption {
  field_id?: string;
  field_name?: string;
}

export interface IdentifyView extends IView {
  id: string;
  name?: string;
  config: IdentifyOption;
}
