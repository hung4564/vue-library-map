<script setup lang="ts">
import TabItem from "../component/tab-item.vue";
import TabContent from "../component/tab-content.vue";
import Collapse from "../../../../Collapse/index.vue";
import { computed, defineProps, defineEmits, ref, onMounted } from "vue";
import { Layer } from "mapbox-gl";
import { TABS, DEFAULT_VALUE, convertTabWithDefaultConfig } from "./type";
import { Tab, TabConfig } from "@/interface/style";
import { inputSlider } from "@/components/input";
const props = defineProps({
  value: {
    required: true
  },
  trans: {
    required: true
  },
  mapId: {
    required: true
  }
});
const emit = defineEmits(["input", "update-style"]);
const layer = computed<Layer>({
  get() {
    return props.value as Layer;
  },
  set(value) {
    emit("input", value);
  }
});
const tabs_format = computed<TabConfig[]>(() => {
  const tab = TABS[layer.value.type];
  if (tab.type === "multi") {
    return tab.tabs.map((x) => ({
      ...x,
      items: convertTabWithDefaultConfig(x.items)
    }));
  }
  return [
    {
      type: "single",
      text: "style",
      items: convertTabWithDefaultConfig(tab.items)
    }
  ];
});
const default_value = computed(() => DEFAULT_VALUE[layer.value.type]);
const tab_group = ref<TabConfig | undefined>(undefined);
const tab = ref<Tab | undefined>(undefined);
const onSelectTab = (item: Tab) => {
  tab.value = item;
  if (tab.value && (tab.value as any).menu) {
    (tab.value as any).menu = (tab.value as any).menu.map((x: any) => ({
      ...x,
      text: x.text || (props.trans as any)(x.text_trans || "") || "",
      subtitle: x.subtitle || (props.trans as any)(x.subtitle_trans || "") || ""
    }));
  }
};
const onSelectTabGroup = (group: TabConfig) => {
  tab_group.value = group;
  if (tab_group.value && tab_group.value.items)
    onSelectTab(tab_group.value.items[0]);
};
const emitInput = (value: any, tab: Tab, layer: any) => {
  if (tab.type === "divider") {
    return;
  }
  if (tab.format) {
    value = tab.format(value);
  }
  layer[tab.part || "paint"][tab.key] = value;
  emit("update-style", layer);
};
onMounted(() => {
  if (tabs_format) onSelectTabGroup(tabs_format.value[0]);
});
const onChangeMinZoom = (zoom: number, layer: any) => {
  layer["min-zoom"] = zoom;
  emit("update-style", layer);
};
const onChangeMaxZoom = (zoom: number, layer: any) => {
  layer["max-zoom"] = zoom;
  emit("update-style", layer);
};
</script>
<template lang="">
  <div class="style-edit-container">
    <Collapse>
      <template #header>
        {{ trans("map.style-control.layer.title") }}
      </template>
      <div class="label-config-container">
        <div class="label-config-item">
          <div class="label-config-item__label">
            {{ trans("map.style-control.layer.id") }}
          </div>
          <div class="label-config-item__input"> {{ layer.id }}</div>
        </div>
        <div class="label-config-item">
          <div class="label-config-item__label">
            {{ trans("map.style-control.layer.type") }}
          </div>
          <div class="label-config-item__input"> {{ layer.type }}</div>
        </div>
        <div class="label-config-item">
          <div class="label-config-item__label">
            {{ trans("map.style-control.layer.min-zoom") }}
          </div>
          <div class="label-config-item__input">
            <inputSlider
              :value="layer['min-zoom'] != null ? layer['min-zoom'] : 0"
              @input="onChangeMinZoom($event, layer)"
              min="0"
              max="24"
              step="1"
            />
          </div>
        </div>
        <div class="label-config-item">
          <div class="label-config-item__label">
            {{ trans("map.style-control.layer.max-zoom") }}
          </div>
          <div class="label-config-item__input">
            <inputSlider
              :value="layer['max-zoom'] != null ? layer['max-zoom'] : 24"
              @input="onChangeMaxZoom($event, layer)"
              min="0"
              max="24"
              step="1"
            />
          </div>
        </div>
      </div>
    </Collapse>

    <Collapse>
      <template #header>
        {{ trans("map.style-control.style.title") }}
      </template>
      <div class="tab-group-label" v-if="tabs_format && tabs_format.length > 1">
        <div
          v-for="item in tabs_format"
          :key="item.key"
          class="tab clickable"
          :class="{ 'tab-active': tab_group && tab_group.trans == item.trans }"
          @click.stop="onSelectTabGroup(item)"
        >
          {{ item.text || trans(item.trans) }}
        </div>
      </div>
      <div class="tab-group-container">
        <div class="label-container">
          <div v-if="tab_group">
            <div
              v-for="item in tab_group.items"
              :key="item.key"
              class="clickable"
              @click.stop="onSelectTab(item)"
            >
              <div v-if="item.type === 'divider'" class="tab-divider"> </div>
              <TabItem
                v-else
                :value="layer[item.part || 'paint'][item.key]"
                :item="item"
                :text="item.text || trans(item.trans)"
                :default_value="default_value[item.part || 'paint'][item.key]"
                :active="tab && tab.key === item.key"
              >
              </TabItem>
            </div>
          </div>
        </div>
        <div class="value-container">
          <div>
            <div class="value-container__label" v-if="tab">
              {{ tab.text || trans(tab.trans) }}
            </div>
            <TabContent
              v-if="tab"
              :item="tab"
              :value="layer[tab.part || 'paint'][tab.key]"
              @input="emitInput($event, tab, layer)"
              :default_value="default_value[tab.part || 'paint'][tab.key]"
              :trans="trans"
              :mapId="mapId"
            >
            </TabContent>
          </div>
        </div>
      </div>
    </Collapse>
  </div>
</template>
<style lang="scss">
.style-edit-container {
  display: flex;
  flex-direction: column;
  .tab-divider {
    border-bottom-width: 1px;
    margin: 8px 12px;
    border-bottom-color: #fff;
    border-bottom-style: solid;
  }
  .tab-group-label {
    display: flex;
    flex-grow: 0;
    .tab {
      border-bottom-width: 3px;
      border-bottom-color: #fff;
      border-bottom-style: solid;
      padding: 12px;
      text-align: center;
      max-width: 100px;
      flex-grow: 1;
    }
    .tab-active {
      border-bottom-color: var(--v-primary-base, #1a73e8);
    }
  }
  .tab-group-container {
    flex-grow: 1;
    display: flex;
    height: 100%;
    overflow: hidden;
    width: 100%;
  }
  height: 100%;
  width: 100%;
  .label-container {
    & > div {
      overflow: auto;
    }
    flex-grow: 0;
    flex-shrink: 0;
    overflow: auto;
    border-right-width: thin;
    border-right-color: #fff;
    border-right-style: solid;
    width: 30%;
    min-width: 150px;
    max-width: 200px;
  }
  .value-container {
    & > div {
      overflow: auto;
    }
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
  }
  .tab-content-padding {
    padding: 16px;
    padding-top: 4px;
    width: calc(100% - 32px);
    min-height: 48px;
    display: flex;
    align-items: center;
  }
  .value-container__label {
    padding: 16px 16px 0;
    font-weight: bolder;
  }
}
.label-config-container {
  padding: 16px;
  .label-config-item {
    display: flex;
    align-items: center;
    outline: none;
    min-height: 48px;
    .label-config-item__label {
      min-height: 48px;
      flex-grow: 0;
      flex-shrink: 0;
      width: calc(30% - 16px);
      min-width: 150px;
      max-width: calc(200px - 16px);
      min-width: calc(150px - 16px);
      vertical-align: middle;
      line-height: 48px;
    }
    .label-config-item__input {
      padding-left: 16px;
    }
  }
}
</style>
