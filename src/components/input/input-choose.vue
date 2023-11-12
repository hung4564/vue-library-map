<script>
export default {
  props: {
    value: {},
    label: String,
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
        this.$emit("change", value);
      }
    }
  },
  methods: {
    onSetValue(item) {
      this.model = item.value;
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
      <div
        v-for="item in items"
        :key="item.value"
        class="item-choose"
        @click.stop="onSetValue(item)"
        :class="{ 'item-choose-active': item.value === model }"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.input-container {
  display: flex;
  border: 1px solid grey;
  border-radius: 15px;
  width: 100%;
}
.item-choose {
  cursor: pointer;
  border-radius: 15px;
  align-items: center;
  height: 18px;
  margin: 1px 1px;
  color: #fff;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: 0.0333333333em;
  font-size: 0.75rem;
  flex-grow: 1;
  text-align: center;
}
.item-choose-active {
  color: var(--v-primary-base, #1a73e8);
}
</style>
