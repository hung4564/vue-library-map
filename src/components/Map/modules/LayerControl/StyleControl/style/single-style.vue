<script setup lang="ts">
import TabItem from "../component/tab-item.vue";
import TabContent from "../component/tab-content.vue";
import { computed, defineProps, defineEmits, ref, onMounted } from "vue";
import { Layer } from "mapbox-gl";
import { TABS, DEFAULT_VALUE, CONFIG_TABS } from "./type";
import { Tab } from "@/interface/style";
const props = defineProps({
  value: {
    required: true
  },
  trans: {
    required: true
  }
});
const emit = defineEmits(["input"]);
const layer = computed<Layer>({
  get() {
    return props.value as Layer;
  },
  set(value) {
    emit("input", value);
  }
});
const tabs_format = computed<Tab[]>(() =>
  TABS[layer.value.type].map((x) =>
    Object.assign(x, CONFIG_TABS.default, CONFIG_TABS[x.type] || {})
  )
);
const default_value = computed(() => DEFAULT_VALUE[layer.value.type]);
const tab = ref<Tab | undefined>(undefined);
const onSelectTab = (item: Tab) => {
  tab.value = item;
  if ((tab.value as any).menu) {
    (tab.value as any).menu = (tab.value as any).menu.map((x: any) => ({
      ...x,
      text: x.text || (props.trans as any)(x.text_trans),
      subtitle: x.subtitle || (props.trans as any)(x.subtitle_trans)
    }));
  }
};
const emitInput = (value: any, tab: Tab, layer: any) => {
  if (tab.format) {
    value = tab.format(value);
  }
  layer[tab.part || "paint"][tab.key] = value;
  emit("input", layer);
};
onMounted(() => {
  if (tabs_format) onSelectTab(tabs_format.value[0]);
});
</script>
<template lang="">
  <div class="style-edit-container">
    <div class="label-container">
      <div>
        <div
          v-for="item in tabs_format"
          :key="item.key"
          class="clickable"
          @click.stop="onSelectTab(item)"
        >
          <TabItem
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
        <TabContent
          v-if="tab"
          :item="tab"
          :value="layer[tab.part || 'paint'][tab.key]"
          @input="emitInput($event, tab, layer)"
          :default_value="default_value[tab.part || 'paint'][tab.key]"
        >
        </TabContent>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.style-edit-container {
  display: flex;
  height: 100%;
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
    width: calc(100% - 32px);
    min-height: 48px;
    display: flex;
    align-items: center;
  }
}
</style>
