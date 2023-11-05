<template lang="">
  <div class="form-group">
    <div class="form-control form-checkbox">
      <input type="checkbox" v-model="form" :disabled="disabled" />
      <label> {{ label }} </label>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      default: "#000000"
    },
    label: String,
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
<style scoped>
.form-checkbox {
  display: flex;
}
.form-checkbox label {
  padding-left: 8px;
}
</style>
