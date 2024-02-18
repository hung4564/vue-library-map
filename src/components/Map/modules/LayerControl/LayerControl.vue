<script lang="ts">
export default {
  name: "layer-control"
};
</script>

<script setup lang="ts">
import { defineProps, onBeforeUnmount, onMounted, reactive, ref } from "vue";

import type { BBox } from "geojson";

import DraggableGroupList from "@/components/DraggableList/draggable-group-list.vue";
import { useMap } from "@/components/Map/mixins/useMap";
import ModuleContainer from "@/components/Map/ModuleContainer.vue";
import { getLayerFromView } from "@/helper/_layer";
import { useShow } from "@/hooks/useShow";
import LayerComponent from "./layer-component.vue";
import type { AGroup, ListView, Menu } from "@/interface/datasource/list";
import type { IView } from "@/interface/datasource/view";
import type { MapSimple } from "@/interface/map";
import enLang from "@/lang/en/layer-control.json";
import type { Layer, TLayer } from "@/model";
import type { AView } from "@/model/datasource/view/view";
import { getAllViewForKey, removeLayer } from "@/store/store-datasource";
import { updateMapLang } from "@/store/store-lang";
import { eventBus, EVENTBUS_TYPE } from "@/utils/event-bus";
import MapControlButton from "@components/Map/control/MapControlButton.vue";
import { DraggableSidebar } from "@hungpv97/vue-library-draggable";
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiDelete,
  mdiDotsVertical,
  mdiGroup,
  mdiLayers,
  mdiPlus
} from "@mdi/js";
import BaseMapCard from "../BaseMapControl/BaseMapCard.vue";
import LayerCreateControl from "./CreateControl/layer-create-control.vue";
import LayerItem from "./item/layer-item.vue";
import LayerItemContextMenu from "./layer-item-context-menu.vue";
import StyleControl from "../StyleControl/style-control.vue";

const VIEW_KEY_TYPE = "list";
defineProps({
  disabledDrag: Boolean,
  disabled: Boolean
});
const { c_mapId, $map, callMap } = useMap();
updateMapLang(c_mapId.value, {
  map: { "layer-control": enLang }
});
const path = {
  icon: mdiLayers,
  menu: mdiDotsVertical,
  group: { create: mdiGroup },
  deleteAll: mdiDelete,
  layer: { create: mdiPlus }
};
const [show, toggleShow] = useShow(true);
const groupShow = ref({});
const groupRef = ref<
  | {
      addNewGroup(name: string): void;
      update(items: any[]): void;
    }
  | undefined
>(undefined);
const layers_select = ref([]);
function addNewGroup() {
  if (groupRef.value) groupRef.value.addNewGroup("");
}
function onRemoveGroupLayer(group: AGroup) {
  if (!group) {
    return;
  }
  if (!group || !group.children || group.children.length === 0) {
    return;
  }
  group.children.forEach((view: AView) => {
    let layer = getLayerFromView(view);
    if (!layer) return;
    removeLayer(c_mapId.value, layer);
  });
}
const views = ref<ListView[]>([]);
function onRemoveAllLayer() {
  if (!views.value || views.value.length === 0) {
    return;
  }
  views.value.forEach((view) => {
    let layer = getLayerFromView(view as IView);
    if (!layer) return;
    removeLayer(c_mapId.value, layer);
  });
}
function getViewFromStore() {
  if (!views.value) return;
  views.value = getAllViewForKey(c_mapId.value, VIEW_KEY_TYPE).sort(
    (a, b) => b.index - a.index
  );
}
function updateLayers() {
  callMap((map: MapSimple) => {
    let beforeId: string = "";
    views.value
      .slice()
      .reverse()
      .forEach(async (view, index) => {
        view.index = index;
        let layer = getLayerFromView(view as IView);
        if (!layer) return;
        layer.moveLayer(map, beforeId);
        beforeId = await layer.getBeforeId();
      });
  });
}
const onUpdateLayer = (view: ListView) => {
  callMap((map: MapSimple) => {
    let layer = getLayerFromView(view);
    if (!layer) return;

    layer.toggleShow(map, view.show);

    if (!view.config.disabled_opacity) layer.setOpacity(map, view.opacity);
  });

  getViewFromStore();
};
const onToBounds = (bounds: BBox) => {
  if (!bounds) {
    return;
  }
  callMap((map: any) => {
    map.fitBounds(bounds, {
      padding: 50,
      duration: 10
    });
  });
};
const onRemoveLayer = (view: ListView) => {
  if (!view) return;
  let layer = getLayerFromView(view);
  if (!layer) return;
  if (menu_context && menu_context.view && menu_context.view.id === view.id) {
    closeContextMenu();
  }
  removeLayer(c_mapId.value, layer);
};
const menu_context = reactive<{
  items: Menu[];
  view: ListView | undefined;
}>({
  items: [],
  view: undefined
});
const contextMenuRef = ref<
  | {
      show(event: MouseEvent, item: ListView): void;
      close(): void;
    }
  | undefined
>();
const handleContextClick = (event: MouseEvent, item: ListView) => {
  menu_context.items = item.menus || [];
  menu_context.view = item;
  if (contextMenuRef.value) contextMenuRef.value.show(event, item);
};
const closeContextMenu = () => {
  menu_context.items = [];
  menu_context.view = undefined;
  if (contextMenuRef.value) contextMenuRef.value.close();
};
function eventUpdateLayer() {
  getViewFromStore();
  updateTree();
}
function eventRemoveLayer(layer: TLayer) {
  if (!layer.canBuildForView(VIEW_KEY_TYPE)) {
    return;
  }
  let view = layer.getView(VIEW_KEY_TYPE);
  if (!view) return;
  let index = views.value.findIndex((x) => x.id === view.id);
  if (index < 0) return;
  views.value.splice(index, 1);
  updateTree();
}
onMounted(() => {
  getViewFromStore();
  eventBus.on(EVENTBUS_TYPE.MAP.SET_LAYER, eventUpdateLayer);
  eventBus.on(EVENTBUS_TYPE.MAP.UPDATE_LAYER, eventUpdateLayer);
  eventBus.on(EVENTBUS_TYPE.MAP.REMOVE_LAYER, eventRemoveLayer);
});
onBeforeUnmount(() => {
  eventBus.off(EVENTBUS_TYPE.MAP.SET_LAYER, eventUpdateLayer);
  eventBus.off(EVENTBUS_TYPE.MAP.UPDATE_LAYER, eventUpdateLayer);
  eventBus.off(EVENTBUS_TYPE.MAP.REMOVE_LAYER, eventRemoveLayer);
});
const updateTree = () => {
  if (groupRef.value) groupRef.value.update(views.value);
};
const [showCreate, toggleShowCreate] = useShow();
function openAddLayer() {
  toggleShowCreate();
}
const styleControlRef = ref<
  | {
      open(layer: Layer): void;
      close(): void;
    }
  | undefined
>();
const layer_action: { [key: string]: Function } = {
  "edit-style": (layer: Layer) => {
    styleControlRef.value?.open(layer);
  }
};
function onLayerAction({ menu, item }: { item: ListView; menu: Menu }) {
  if (!menu) return;
  if (menu.type !== "item") return;
  if (!menu.id) return;
  if (!item) return;
  let layer = getLayerFromView(item);
  if (!layer) return;
  const menu_layer = layer.getAction().get(menu.id);
  if (menu_layer.type && layer_action[menu_layer.type]) {
    layer_action[menu_layer.type](layer, menu_layer);
  } else {
    layer.getAction().call(menu.id, c_mapId.value);
  }
}
</script>
<template>
  <ModuleContainer v-bind="$attrs">
    <template #btn>
      <MapControlButton
        v-if="!show"
        :tooltip="$map.trans('map.layer-control.title')"
        @click="toggleShow()"
        :active="show"
      >
        <SvgIcon size="14" type="mdi" :path="path.icon" />
      </MapControlButton>
    </template>

    <template #draggable="props">
      <DraggableSidebar v-bind="props" :show.sync="show">
        <template #title>
          <span class="layer-control__title">
            {{ $map.trans("map.layer-control.title") }}
          </span>
        </template>
        <div class="layer-control">
          <div class="layer-control-container">
            <div class="layer-control__header">
              <button class="layer-item__button" @click.stop="openAddLayer()">
                <SvgIcon size="14" type="mdi" :path="path.layer.create" />
              </button>
              <div class="v-spacer"></div>
              <button class="layer-item__button" @click="addNewGroup()">
                <SvgIcon size="14" type="mdi" :path="path.group.create" />
              </button>
              <button class="layer-item__button" @click="onRemoveAllLayer">
                <SvgIcon size="14" type="mdi" :path="path.deleteAll" />
              </button>
            </div>
            <div class="layer-control__list">
              <draggable-group-list
                ref="groupRef"
                :items.sync="views"
                :groupShow.sync="groupShow"
                :selected.sync="layers_select"
                :disabled="disabled"
                :disabledDrag="disabledDrag"
                @click-drag:done="updateLayers()"
                @click-group:remove="onRemoveGroupLayer"
              >
                <template #item="{ isSelected, item, toggleSelect }">
                  <slot
                    name="item"
                    :item="item"
                    :isSelected="isSelected"
                    :toggleSelect="toggleSelect"
                  >
                    <component
                      :is="item.component || LayerItem"
                      :item="item"
                      :isSelected="isSelected"
                      @click="toggleSelect(item)"
                      @update:item="onUpdateLayer"
                      @click:bounds="onToBounds"
                      @click:remove="onRemoveLayer"
                    >
                      <template #pre-btn="{ loading }">
                        <button
                          @click="onLayerAction(menu)"
                          v-for="(menu, i) in item.extra_buttons"
                          :key="i"
                          class="layer-item__button"
                          :disabled="loading"
                          :title="menu.name"
                          v-bind="menu.attr"
                        >
                          <SvgIcon size="14" type="mdi" :path="menu.icon" />
                        </button>
                      </template>

                      <template #extra-btn="{ loading }">
                        <button
                          v-if="item.menus && item.menus.length > 0"
                          class="layer-item__button"
                          :disabled="loading"
                          @click.prevent.stop="handleContextClick($event, item)"
                        >
                          <SvgIcon size="14" type="mdi" :path="path.menu" />
                        </button>
                      </template>
                    </component>
                  </slot>
                </template>
              </draggable-group-list>
            </div>
          </div>
          <div class="base-map-card-container">
            <BaseMapCard :mapId="c_mapId" />
          </div>
        </div>
      </DraggableSidebar>
    </template>

    <LayerItemContextMenu
      ref="contextMenuRef"
      :options="menu_context.items"
      @click:option="onLayerAction"
    />
    <LayerCreateControl :show.sync="showCreate" />
    <slot />
    <StyleControl ref="styleControlRef" />
    <LayerComponent />
  </ModuleContainer>
</template>

<style>
.fill-height {
  height: 100%;
}
</style>
<style scoped>
.layer-control {
  display: flex;
  flex-direction: column;
}
.layer-control-container {
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex-grow: 1;
}
.base-map-card-container {
  flex-grow: 0;
}
.layer-control__list {
  flex-grow: 1;
  overflow: auto;
  padding: 4px 12px 8px;
}
.layer-control {
  height: 100%;
  overflow: hidden;
}
.layer-control__title {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.draggable-group__divider {
  padding: 4px 0;
  display: block;
  flex: 1 1 100%;
  height: 0px;
  max-height: 0px;
  opacity: 0.12;
  transition: inherit;
  border-style: solid;
  border-width: thin 0 0 0;
}
.layer-control__header {
  display: flex;
  align-items: center;
  padding: 8px;
}
.v-spacer {
  flex: 1 1 auto;
}
.layer-control__header .layer-item__button {
  display: inline-flex;
  min-width: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  box-shadow: unset;
  outline: none;
  border: none;
}
</style>
