import { EaseToOptions, PaddingOptions } from "mapbox-gl";

import { MapSimple } from "@/interface/map";
import bbox from "@turf/bbox";
import { getSideBarCount } from "@/store/store-map";

export const fitBounds = (map: MapSimple, value: any, { zoom = 15 } = {}) => {
  if (!value || !map) return;
  const padding: PaddingOptions = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
  };

  if (["Point"].includes(value.type)) {
    map.easeTo({
      center: value.coordinates,
      zoom,
      duration: 0,
      padding
    } as EaseToOptions);
    return;
  }
  const count = getSideBarCount(map.id) || { left_count: 0, right_count: 0 };
  padding.left = count.left_count > 0 ? 450 : padding.left;
  padding.right = count.right_count > 0 ? 450 : padding.right;

  let bboxFil = undefined;
  if (value.length == 4) {
    bboxFil = value;
  } else {
    bboxFil = getBBox(value);
  }

  if (!bboxFil) return;

  map.fitBounds(bboxFil, {
    padding,
    duration: 0
  });
};
function getBBox(feature: any) {
  if (!feature.type) return;
  let bboxFil = undefined;
  if (["Feature", "FeatureCollection"].includes(feature.type)) {
    bboxFil = bbox(feature);
  } else {
    bboxFil = bbox({
      type: "Feature",
      properties: {},
      geometry: feature
    });
  }
  return bboxFil;
}
