<template lang="">
  <div class="tab-item" :class="{ 'tab-item-active': active }" v-bind="$attrs">
    <div>
      <div>
        {{ text }}
      </div>
      <div
        v-if="!item.component || !item.component.label"
        class="tab-item-no-content"
      >
        <p>
          {{ value || default_value }}
        </p>
      </div>
      <component
        v-else
        :is="item.component.label"
        v-bind="attrs"
        :tab="item"
        :value="value"
        :default_value="default_value"
      ></component>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, defineProps } from "vue";
const props = defineProps({
  value: {},
  text: {},
  item: {
    type: Object,
    default: () => ({ key: "", type: "unit", unit: "px" })
  },
  default_value: {},
  disabled: Boolean,
  active: Boolean
});
const attrs = computed(() => {
  if (!props.item || !props.item.props || !props.item.props.label) {
    return {};
  }
  if (typeof props.item.props.label == "function") {
    return props.item.props.label(props.item);
  }
  return props.item.props.label;
});
</script>
<style scoped>
.tab-item {
  align-items: center;
  display: flex;
  flex: 1 1 100%;
  letter-spacing: normal;
  min-height: 48px;
  outline: none;
  padding: 0 16px;
  position: relative;
  text-decoration: none;
}
.tab-item-active {
  color: var(--v-primary-base, #38d4ff);
}
</style>
