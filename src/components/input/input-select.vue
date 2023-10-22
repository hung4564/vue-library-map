<script>
export default {
  props: {
    value: {},
    label: String,
    items: { type: Array, default: () => [] },
    itemValue: { type: String, default: "value" },
    itemText: { type: String, default: "text" },
    returnObject: Object
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    getValue(item) {
      if (typeof item === "string" || this.returnObject) {
        return item;
      }
      return item[this.itemValue];
    },
    getText(item) {
      if (typeof item === "string") {
        return item;
      }
      return item[this.itemText];
    },
    getKey(item) {
      if (typeof item === "string") {
        return item;
      }
      return item[this.itemValue];
    }
  }
};
</script>
<template>
  <div class="form-group">
    <label v-if="label">
      {{ label }}
    </label>
    <div class="input-container">
      <select v-bind="$attrs" v-model="model" required>
        <option value="" disabled selected hidden>{{
          $attrs.placeholder
        }}</option>
        <option
          :value="getValue(item)"
          v-for="item in items"
          :key="getKey(item)"
        >
          {{ getText(item) }}
        </option>
      </select>
    </div>
  </div>
</template>
<style scoped>
.input-container option:not(:disabled) {
  background-color: transparent;
  color: black;
}
.input-container > select {
  width: 100%;
  padding: 8px;
  display: block;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: inherit;
  box-sizing: border-box;
  background-color: transparent;
  outline: none;
  position: relative;
}
.input-container > select:focus {
  border: 1px solid #fff;
}
.input-container > select:invalid {
  color: gray;
}
</style>
