import { MapSimple } from "@/interface/map";
export function updateLayer(map: MapSimple, old: any, new_value: any) {
  for (const key in new_value.paint) {
    if (new_value.paint[key] !== old.paint[key])
      map.setPaintProperty(old.id, key, new_value.paint[key]);
  }
  for (const key in new_value.layout) {
    if (new_value.layout[key] !== old.layout[key])
      map.setLayoutProperty(old.id, key, new_value.layout[key]);
  }
}
