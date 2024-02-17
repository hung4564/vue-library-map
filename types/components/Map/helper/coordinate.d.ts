export function deg_to_dms(deg: any): {
  deg: number;
  min: number;
  sec: number;
};
export function dms_to_des({
  deg,
  min,
  sec
}?: {
  deg: any;
  min: any;
  sec: any;
}): string;
export function deg_to_dms_string(str: any): string;
export function latDMS(lat: any): string;
export function lngDMS(lng: any): string;
