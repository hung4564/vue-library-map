<template>
  <div class="collapse collapse-item" :class="{ 'is-active': active }">
    <div
      class="collapse-header touchable"
      role="tab"
      :aria-expanded="active ? 'true' : 'false'"
      @click.prevent="toggle"
    >
      <div class="collapse-header__title">
        <slot name="header"></slot>
      </div>
      <div class="collapse-header__icon">
        <SvgIcon size="14" type="mdi" :path="path.close" v-if="active" />

        <SvgIcon size="14" type="mdi" :path="path.open" v-else />
      </div>
    </div>
    <transition name="fade">
      <div class="collapse-content" v-if="active">
        <div class="collapse-content-box">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Collapse"
};
</script>
<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMenuDown, mdiMenuUp } from "@mdi/js";
import { defineProps, ref, defineEmits } from "vue";
const props = defineProps({
  selected: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(["update:selected", "open", "close"]);
const active = ref(props.selected);
const toggle = () => {
  active.value = !active.value;
  emit("update:selected", active.value);
  if (active.value) {
    emit("open");
  } else {
    emit("close");
  }
};
const path = {
  open: mdiMenuDown,
  close: mdiMenuUp
};
</script>
<style scoped>
.collapse .collapse-header {
  padding: 12px;
  display: flex;
  position: relative;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
  border-bottom-style: solid;
}
.collapse-header__title {
  flex-grow: 1;
}
.collapse-header__icon {
  flex-grow: 0;
}
.collapse .collapse-header > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.collapse .collapse-header h3 {
  font-size: 0.938em;
  font-weight: bold;
}
.collapse .collapse-header::before {
  -moz-transition: all 0.2s;
  -o-transition: all 0.2s;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  position: absolute;
  font-size: 0.4em;
  top: calc(50% - 0.4em);
  left: 20px;
  -moz-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
.collapse.is-active .collapse-header::before {
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
.collapse .collapse-content-box {
  min-height: 20px;
  -moz-transition: all 0.2s;
  -o-transition: all 0.2s;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
  border-bottom-style: solid;
}
</style>
