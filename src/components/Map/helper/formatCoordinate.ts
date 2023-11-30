import { latDMS, lngDMS } from "./coordinate";

import { CrsItem } from "@/store/store-crs";
import proj4 from "proj4";

export function formatCoordinate(
  { longitude, latitude }: { longitude?: number; latitude?: number },
  crs?: CrsItem,
  isDMS = false
) {
  if (!longitude || !latitude) return;
  const currentPoint = { longitude: "0", latitude: "0" };
  if (crs && !crs.default && crs.proj4js) {
    [longitude, latitude] = proj4(crs.proj4js, [longitude, latitude]);
  }
  if (crs && crs.unit === "meter") {
    currentPoint.longitude = longitude.toFixed(0);
    currentPoint.latitude = latitude.toFixed(0);
  } else {
    if (isDMS) {
      currentPoint.longitude = lngDMS(+longitude);
      currentPoint.latitude = latDMS(+latitude);
    } else {
      currentPoint.longitude = longitude.toFixed(6);
      currentPoint.latitude = latitude.toFixed(6);
    }
  }
  return currentPoint;
}
