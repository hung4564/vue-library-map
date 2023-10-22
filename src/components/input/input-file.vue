<script>
export default {
  props: {
    value: {},
    label: String,
    accept: String,
    multiple: Boolean
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
    onChangeFile(event) {
      const files = Array.from(event.target.files);
      if (files.length > 0)
        this.$emit("change", this.multiple ? files : files[0]);
      const input = this.$refs.file;
      if (input) {
        input.type = "text";
        input.type = "file";
        input.value = "";
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
      <input
        ref="file"
        v-bind="$attrs"
        @change="onChangeFile"
        type="file"
        :accept="accept"
        :multiple="multiple"
      />
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
