import { LayerPartContainer } from "./_default";

export class LayerMapContainer extends LayerPartContainer {
  map_id: string;
  sub_map_ids: string[];
  constructor() {
    super();
    this.map_id = "";
    this.sub_map_ids = [];
  }
  isHas(map_id: string) {
    return this.sub_map_ids.includes(map_id);
  }
  add(map_id: string) {
    if (map_id && !this.sub_map_ids.includes(map_id)) {
      this.sub_map_ids.push(map_id);
    }
    return this;
  }
  remove(map_id: string) {
    if (map_id && this.sub_map_ids.includes(map_id)) {
      const index = this.sub_map_ids.indexOf(map_id);
      if (index !== -1) {
        this.sub_map_ids.splice(index, 1);
      }
    }
    return this;
  }
}
