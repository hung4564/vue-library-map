import { EVENTBUS_TYPE, eventBus } from "@/utils/event-bus";
import { getMap, initForMap } from "./store-map";
import { getStore as getMapStore, initStore } from "@/store/store";

import { BaseMapLayer } from "@/components/Map/modules/BaseMapControl/model";

const KEY = "base_map_store";
type BaseMap = any;
type Store = {
  defaultBaseMap: string;
  loading: boolean;
  current_baseMaps?: BaseMap;
  baseMaps: BaseMap[];
  is_compare?: boolean;
  layer?: any;
};
initStore<{ [key: string]: Store }>(KEY, () => ({}));
initForCompare();
function getStore(mapId: string): Store {
  return getMapStore(KEY)[mapId];
}
function initForCompare() {
  eventBus.on(
    EVENTBUS_TYPE.MAP.COMPARE,
    function ({ map_id, is_compare }: { map_id: string; is_compare: boolean }) {
      if (!is_compare) {
        return;
      }
      const maps = getMap(map_id);
      if (Array.isArray(maps)) {
        const storeBaseMap = getStoreMap(map_id);
        const baseMap =
          storeBaseMap.current_baseMaps ||
          storeBaseMap.baseMaps[getIndexDefault(map_id)];

        for (let index = 0; index < maps.length; index++) {
          const element = maps[index];
          setBaseMapForMap(element.id, baseMap);
        }
      }
    }
  );
}
export function initMapBaseMap(mapId: string) {
  if (getStore(mapId)) {
    return;
  }
  const maps = getMap(mapId);
  getMapStore(KEY)[mapId] =
    Array.isArray(maps) && maps.length > 0
      ? {
          baseMaps: [],
          is_compare: true
        }
      : {
          baseMaps: [],
          current_baseMaps: null,
          loading: false,
          defaultBaseMap: "",
          layer: null
        };
}
export const removeBaseMap = (mapId: string) => {
  delete getMapStore(KEY)[mapId];
};

const getStoreMap = (id: string) => getStore(id) || {};
export const setBaseMaps = (mapId: string, baseMaps = []) => {
  getStoreMap(mapId).baseMaps = baseMaps;
  setBaseMapForMap(mapId, baseMaps[getIndexDefault(mapId)]);
};
export const baseMaps = (mapId: string) => getStoreMap(mapId).baseMaps;
export const getLoading = (mapId: string) => getStoreMap(mapId).loading;
export const getCurrentBaseMaps = (mapId: string) =>
  getStoreMap(mapId).current_baseMaps;

export const setDefaultValueForMap = (mapId: string, titleMap: any) => {
  const store = getStoreMap(mapId);
  store.defaultBaseMap = titleMap;
};
export const setBaseMapForMap = async (mapId: string, item: any) => {
  if (!item) return;
  const store = getStoreMap(mapId);
  if (store.loading) return;
  store.current_baseMaps = item;
  store.loading = true;
  const metadata = {
    loading: false
  };
  metadata.loading = true;
  if (!store.layer) {
    store.layer = new BaseMapLayer();
  }
  metadata.loading = true;

  eventBus.emit(EVENTBUS_TYPE.MAP.SET_BASEMAP, { mapId, baseMap: item });
  await getMap(mapId, async (map: any) => {
    await store.layer.removeFromMap(map);
  });
  await store.layer.setBaseMap(item);
  await getMap(mapId, async (map: any) => {
    store.layer.addToMap(map, getLowestLayerId(map));
  });
  store.loading = false;
  metadata.loading = false;
};
function getIndexDefault(mapId: string) {
  const store = getStoreMap(mapId);
  const defaultIndexBaseMap = store.baseMaps.findIndex(
    (b: any) => b.default || b.title === store.defaultBaseMap
  );
  return defaultIndexBaseMap < 0 ? 0 : defaultIndexBaseMap;
}
export function clearBaseMapForMap(mapId: string) {
  const store = getStoreMap(mapId);
  if (!store.layer) {
    return;
  }
  getMap(mapId, (map: any) => {
    store.layer.removeFromMap(map);
  });
}
function getLowestLayerId(map: any) {
  const layers = map.getStyle().layers;

  return layers.length > 0 ? layers[0].id : null;
}

initForMap(initMapBaseMap, removeBaseMap);
