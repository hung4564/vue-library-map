<template>
  <div class="form-group">
    <label v-if="label">
      {{ label }}
    </label>
    <div class="input-container">
      <Sketch
        :value="form"
        v-bind="$attrs"
        @input="({ hex }) => (form = hex)"
        :disabled="disabled"
      />
    </div>
  </div>
</template>
<script>
import { Sketch } from "vue-color";
export default {
  components: { Sketch },
  props: {
    label: String,
    value: {},
    disabled: Boolean
  },
  computed: {
    form: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>
