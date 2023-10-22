import { AView } from "../view";
import type { BBox } from "geojson";
import { ISource } from "@/interface/source";
export declare class ASource extends AView implements ISource {
  bounds: BBox;
  constructor();
  setBounds(bounds: BBox): void;
  getMapboxSource(): {};
}
