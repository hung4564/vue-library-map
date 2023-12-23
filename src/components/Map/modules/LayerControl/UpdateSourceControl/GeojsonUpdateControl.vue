<script>
export default {
  name: "detail-layer-info"
};
</script>

<script setup>
import { getLayerFromView } from "@/helper/_layer";
import { useMap } from "@components/Map/mixins/useMap";
import { DraggableSidebar } from "@hungpv97/vue-library-draggable";

import { defineEmits, defineProps, onMounted, ref } from "vue";
import { codemirror } from "vue-codemirror";
import "codemirror/theme/base16-dark.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/fold/foldgutter.css";
import geojsonValidation from "geojson-validation";
const { callMap } = useMap();
const cmOptions = {
  tabSize: 2,
  mode: "application/json",
  styleActiveLine: true,
  lineNumbers: true,
  line: true,
  lineWrapping: true,
  foldGutter: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  theme: "base16-dark"
};
const emit = defineEmits(["close"]);
const geojson = ref("");
function onUpdateShow(val) {
  if (!val) {
    emit("close");
  }
}
const props = defineProps({
  item: {
    required: true
  },
  option: {
    default: () => ({})
  }
});
const layer = getLayerFromView(props.item);
const source = layer.getSource();
const onCmCodeChange = (value) => {
  value = JSON.parse(value);
  if (geojsonValidation.valid(value)) {
    source.setData(value);
    callMap((map) => {
      layer.updateForMap(map);
    });
  }
};
onMounted(() => {
  geojson.value = JSON.stringify(source.getAll(), null, 2);
});
</script>
<template lang="">
  <DraggableSidebar
    right
    v-bind="$attrs"
    show
    @update:show="onUpdateShow"
    :width="400"
  >
    <div class="full-height editor">
      <codemirror
        v-model="geojson"
        class="full-height"
        :options="cmOptions"
        @input="onCmCodeChange"
      />
    </div>
  </DraggableSidebar>
</template>

<style>
.editor .CodeMirror {
  height: 100%;
}
.editor .cm-s-base16-dark.CodeMirror {
  background: transparent !important;
}
.editor .cm-s-base16-dark .CodeMirror-gutters {
  background: transparent !important;
}
.editor .cm-s-base16-dark .CodeMirror-linenumber {
  color: #fff;
}
</style>
