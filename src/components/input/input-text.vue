<script>
export default {
  props: {
    value: {},
    label: String
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
  }
};
</script>
<template>
  <div class="form-group">
    <label v-if="label">
      {{ label }}
    </label>
    <div class="input-container">
      <input v-bind="$attrs" v-model="model" />
    </div>
  </div>
</template>
<style scoped>
.input-container > input {
  width: 100%;
  padding: 8px;
  display: block;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: inherit;
  box-sizing: border-box;
  background-color: transparent;
  outline: none;
}
.input-container > input:focus {
  border: 1px solid #fff;
}
</style>
