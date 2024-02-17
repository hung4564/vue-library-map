export function useMap(
  onInit: any,
  onDestroy: any
): {
  c_mapId: import("vue").ComputedRef<any>;
  bindModule: import("vue").ComputedRef<{
    mapId: any;
    dragId: any;
  }>;
  callMap: (cb: any) => void;
  $map: any;
  trans: any;
};
