<script setup>
import { defineProps } from "vue";
defineProps({
  fields: {
    type: Array,
    default: () => [{ text: "Status", value: "waiting..." }]
  }
});
</script>

<template lang="">
  <div>
    <div
      class="field-container label-value"
      v-for="(field, i) in fields"
      :key="i"
    >
      <div class="label-container">
        <div class="label-field"> {{ field.text }} </div>
        <div class="label-field-value"> {{ field.value }} </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.label-field {
  color: #fff;
  caret-color: #fff;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: 0.0333333333em;
}
.label-container {
  display: flex;
  flex-wrap: wrap;
}
.label-container .label-field {
  flex-grow: 1;
}
.label-value .label-field {
  width: 150px;
  flex-grow: 0;
  line-height: 2rem;
}
.label-value {
  padding: 12px 12px 0;
}
.label-field-value {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  text-align: center;
  flex-grow: 1;
}
</style>
