import { CrsItem } from "@/store/store-crs";
export declare function formatCoordinate(
  {
    longitude,
    latitude
  }: {
    longitude?: number;
    latitude?: number;
  },
  crs?: CrsItem,
  isDMS?: boolean
): {
  longitude: string;
  latitude: string;
};
