import { getUUIDv4 } from "@/utils";
export class Base {
  _id: string;
  get id() {
    return this._id;
  }
  constructor() {
    this._id = `${getUUIDv4()}`;
  }
}
