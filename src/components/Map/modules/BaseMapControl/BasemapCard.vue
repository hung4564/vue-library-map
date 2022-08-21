<template>
  <v-sheet class="elevation-1 full-width overflow-hidden" tile height="70">
    <div class="pa-2 full-width full-height d-flex" v-if="current_baseMaps">
      <div class="flex-grow-0">
        <v-sheet height="54px" width="54px">
          <v-img :aspect-ratio="1" :src="current_baseMaps.thumbnail"> </v-img>
        </v-sheet>
      </div>
      <div class="px-2">
        <div class="d-flex align-center">
          <span class="text-caption d-inline-block text-truncate flex-grow-1">
            <span>{{ title || trans("map.basemap.title") }}</span>
          </span>
        </div>
        <div>
          <v-select
            class="ma-0"
            :items="c_baseMaps"
            item-text="title"
            item-value="id"
            dense
            hide-details
            return-object
            single-line
            @input="loadItem($event)"
            :value="current_baseMaps"
          ></v-select>
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import BaseMapMixins from "./BaseMapStore.mixins";
export default {
  props: {},
  mixins: [BaseMapMixins],
  data: () => ({}),
  computed: {},
  methods: {}
};
</script>

<style scoped></style>
