<template>
  <div class="legend-item">
    <div class="legend-value-container">
      <div class="legend-value">
        {{ item.value1 }}
      </div>
      <div class="legend-value">
        {{ item.value2 }}
      </div>
    </div>
    <div>
      <div
        :style="{
          background: `linear-gradient(to right,${item.color1}, ${item.color2})`
        }"
        class="legend-item-color"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: { type: Object, default: () => ({}) }
  },
  computed: {
    item() {
      return this.value;
    }
  }
};
</script>
<style scoped>
.legend-item {
  display: flex;
  padding: 4px;
  flex-direction: column;
}
.legend-value-container {
  display: table;
  width: 100%;
}
.legend-item-color {
  width: 100%;
  height: 20px;
  border-radius: 5px;
  border: 1px solid lightgray;
}
.legend-value {
  font-size: 0.875rem;
  display: table-cell;
  padding-bottom: 8px;
}
.legend-value:last-child {
  text-align: right;
}
</style>
