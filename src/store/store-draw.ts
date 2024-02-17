import { EVENTBUS_TYPE, eventBus } from "@/utils/event-bus";
import type { Feature, FeatureCollection, GeoJSON } from "geojson";
import { getMap, initForMap } from "./store-map";
import { getStore as getMapStore, initStore } from "@/store/store";

import { Layer } from "@/model";
import { LayerDrawBuild } from "@/model/datasource/extra/draw";
import Vue from "vue";
import { getUUIDv4 } from "@/utils";

export type DrawSaveFcParams = {
  added: Record<string, Feature>;
  updated: Record<string, Feature>;
  deleted: Record<string, Feature>;
  geojson: GeoJSON;
};
export type DrawSaveFc = (params: DrawSaveFcParams) => void;
type Store = {
  state: {
    activated: boolean;
    register_id?: string;
    show: boolean;
  };
  control: any;
  callback?: DrawSaveFc;
  featuresAdded: Record<string, boolean>;
  featuresUpdated: Record<string, boolean>;
  featuresDeleted: Record<string, Feature>;
  action: {
    addFeatures?: (features: Feature[]) => Promise<boolean | void>;
    updateFeatures?: (features: Feature[]) => Promise<boolean | void>;
    deleteFeatures?: (features: Feature[]) => Promise<boolean | void>;
    getFeatures?: (point: [number, number]) => Promise<Feature[]>;
    reset?: () => Promise<boolean | void>;
    close?: () => void;
  };
};
const KEY = "draw";
initStore(KEY, () => ({}));

function getStore(map_id: string): Store {
  return getMapStore(KEY)[map_id];
}
initForMap(initStoreForMap, removeStoreForMap);
function initStoreForMap(map_id: string) {
  if (getMapStore(KEY)[map_id]) {
    return;
  }
  const store: Store = {
    control: null,
    state: Vue.observable({
      activated: false,
      register_id: undefined,
      show: false
    }),
    featuresAdded: {},
    featuresUpdated: {},
    featuresDeleted: {},
    action: {}
  };
  getMapStore(KEY)[map_id] = store;
}
function removeStoreForMap(map_id: string) {
  delete getMapStore(KEY)[map_id];
}
export const initDrawControl = (map_id: string, control: any) => {
  getMapStore(KEY)[map_id].control = control;
};

export const activateDraw = (
  map_id: string,
  register_id: string,
  geojson?: GeoJSON
) => {
  if (!register_id) {
    throw new Error("Need register id");
  }
  const store = getStore(map_id);
  const state = store.state;
  const control = store.control;
  state.register_id = register_id;
  state.activated = true;
  control.changeMode("simple_select");
  if (geojson) {
    control.add(geojson);
  }
};
export const deactivateDraw = (map_id: string) => {
  const store = getStore(map_id);
  store.action.close && store.action.close();
  store.action = {};
  const state = store.state;
  state.show = false;
  // const control = store.control;
  state.register_id = undefined;
  state.activated = false;
  store.callback = undefined;
  store.featuresAdded = {};
  store.featuresUpdated = {};
  store.featuresDeleted = {};
};
function checkDrawId(map_id: string, register_id: string) {
  const store = getStore(map_id);
  const state = store.state;
  if (!state.activated) {
    throw new Error("Need to call activateDraw first");
  }
  if (state.register_id && state.register_id !== register_id) {
    throw new Error("register id not match");
  }
}
export const draw = (
  map_id: string,
  register_id: string,
  type: string,
  callback?: DrawSaveFc,
  options?: any
) => {
  const store = getStore(map_id);
  checkDrawId(map_id, register_id);
  const control = store.control;
  store.callback = callback;
  control.changeMode(type, options);
};
export const saveDraw = (
  map_id: string,
  register_id: string,
  callback?: DrawSaveFc
) => {
  const store = getStore(map_id);
  const state = store.state;
  const action = store.action;
  checkDrawId(map_id, register_id);

  if (callback && !(callback instanceof Function)) {
    throw new Error("Callback is not available");
  }
  const drawControlDeletedFeatures = store.featuresDeleted;
  const drawControlAddedFeatures = store.featuresAdded;
  const drawControlUpdatedFeatures = store.featuresUpdated;
  const control = store.control;
  const result: DrawSaveFcParams = {
    added: {},
    updated: {},
    deleted: drawControlDeletedFeatures,
    geojson: {
      type: "FeatureCollection",
      features: []
    }
  };
  const collection = control.getAll() as FeatureCollection;
  collection.features.forEach((feature) => {
    const id_feature = feature.id!;
    if (drawControlAddedFeatures[id_feature]) {
      result.added[id_feature] = feature;
      if (!feature.properties) {
        feature.properties = {};
      }
      feature.properties.id = feature.id;
    } else if (drawControlUpdatedFeatures[id_feature]) {
      result.updated[id_feature] = feature;
    }
  });

  if (action.deleteFeatures) {
    action.deleteFeatures(Object.values(drawControlDeletedFeatures));
  }
  if (action.addFeatures) {
    action.addFeatures(Object.values(result.added));
  }
  if (action.updateFeatures) {
    action.updateFeatures(Object.values(result.updated));
  }
  if (action.reset) {
    action.reset();
  }
  result.geojson = collection;

  callback && callback(result);
  clearDraw(map_id);
  state.activated = false;
  // deactivateDraw(map_id);
};
export function cancelDraw(map_id: string) {
  const store = getStore(map_id);
  const state = store.state;
  clearDraw(map_id);
  state.activated = false;
  // deactivateDraw(map_id);
}
export const clearDraw = (map_id: string) => {
  const store = getStore(map_id);
  store.featuresAdded = {};
  store.featuresAdded = {};
  store.featuresDeleted = {};
  store.control.deleteAll();
  store.control.changeMode("simple_select");
};
export function setFeature(
  map_id: string,
  type: "added" | "updated" | "deleted",
  feature: Feature
) {
  const store = getStore(map_id);
  switch (type) {
    case "added":
      store.featuresAdded[feature.id!] = true;
      break;

    case "updated":
      if (store.featuresAdded[feature.id!]) return;
      store.featuresUpdated[feature.id!] = true;
      break;
    case "deleted":
      if (store.featuresAdded[feature.id!]) return;
      store.featuresDeleted[feature.id!] = feature;
      break;

    default:
      break;
  }
}
export function checkAndCallDone(map_id: string, register_id: string) {
  const store = getStore(map_id);
  if (store.callback) {
    saveDraw(map_id, register_id, store.callback);
    store.callback = undefined;
  }
}

export function callDraw(map_id: string, layer: Layer) {
  const register_id = getUUIDv4();
  const store = getStore(map_id);
  const state = store.state;
  const action = store.action;
  state.register_id = register_id;
  state.show = true;
  const source = layer.getSource();
  action.addFeatures = source.addFeatures && source.addFeatures?.bind(source);
  action.updateFeatures =
    source.updateFeatures && source.updateFeatures?.bind(source);
  action.deleteFeatures =
    source.deleteFeatures && source.deleteFeatures?.bind(source);
  action.getFeatures = source.getFeatures && source.getFeatures?.bind(source);
  action.reset = async () => {
    getMap(map_id, (map) => {
      layer.getSource().updateForMap(map);
    });
  };
  action.close = () => {
    const drawBuild = new LayerDrawBuild();
    drawBuild.toggleDraw(layer, "draw");
  };
  eventBus.emit(EVENTBUS_TYPE.DRAW.ADD);
  return register_id;
}

export const getDrawIsActivated = (map_id: string) =>
  getStore(map_id).state.activated;

export const getDrawIsRegisterId = (map_id: string) =>
  getStore(map_id).state.register_id;

export const getDrawIsShow = (map_id: string) => getStore(map_id).state.show;
export const getDrawAction = (map_id: string) => getStore(map_id).action;
