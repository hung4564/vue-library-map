<template>
  <v-menu
    close-delay="100"
    content-class="elevation-0"
    :left="!isLeft"
    :nudge-left="isRight ? 5 : 0"
    :nudge-right="isLeft ? 5 : 0"
    offset-x
    open-on-hover
    :right="!isRight"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        v-if="isGroup"
        v-bind="$attrs"
        elevation="0"
        fab
        :height="groupSize || size"
        text
        :title="tooltip"
        :width="groupSize || size"
        x-small
        v-on="on"
      >
        <v-icon>
          {{ icon }}
        </v-icon>
      </v-btn>
      <div v-else class="button-container" v-on="on">
        <div :title="tooltip">
          <v-btn
            v-bind="$attrs"
            elevation="2"
            fab
            :height="groupSize || size"
            :loading="loading"
            :width="groupSize || size"
            x-small
          >
            <v-icon>
              {{ icon }}
            </v-icon>
          </v-btn>
        </div>
      </div>
    </template>
    <div class="pb-1">
      <slot />
    </div>
  </v-menu>
</template>

<script>
export default {
  props: {
    icon: {
      type: String
    },
    size: { type: Number, default: 32 },
    tooltip: String,
    loading: Boolean,
    position: {
      type: String,
      default: "bottom-right",
      validator(value) {
        return (
          ["top-left", "top-right", "bottom-left", "bottom-right"].indexOf(
            value
          ) !== -1
        );
      }
    }
  },
  inject: {
    isGroup: { default: false },
    groupSize: { default: 0, from: "size" }
  },
  computed: {
    isLeft() {
      return this.position.includes("left");
    },
    isRight() {
      return this.position.includes("right");
    }
  }
};
</script>

<style scoped>
.button-container {
  position: relative;
}
</style>
