<template>
  <ModuleContainer v-bind="bindModule">
    <template #btn>
      <MapControlButton
        @click="toggleShow"
        :tooltip="$map.trans('map.compare.setting.title')"
      >
        <SvgIcon :size="18" type="mdi" :path="path.icon" />
      </MapControlButton>
    </template>

    <template #draggable="props">
      <DraggablePopup
        v-bind="props"
        :show.sync="popup.show"
        :title="$map.trans('map.compare.setting.title')"
      >
        <div class="setting-container">
          <div>
            <FieldCheckbox
              label="Compare"
              v-model="setting.compare"
              @input="onChangeSetting"
            />
          </div>
          <div>
            <FieldCheckbox
              label="Sync"
              :disabled="!setting.compare"
              v-model="setting.sync"
              @input="onChangeSetting"
            />
          </div>
          <div>
            <FieldCheckbox
              label="Split"
              :disabled="!setting.compare"
              v-model="setting.split"
              @input="onChangeSetting"
            />
          </div>
        </div>
      </DraggablePopup>
    </template>
    <slot />
  </ModuleContainer>
</template>

<script>
import { DraggablePopup } from "@hungpv97/vue-library-draggable";
import { mdiCog } from "@mdi/js";
import ModuleMixin from "@/components/Map/mixins/ModuleMixin";
import MapControlButton from "@/components/Map/control/MapControlButton.vue";
import FieldCheckbox from "@/components/Field/field-checkbox.vue";
export default {
  components: { MapControlButton, DraggablePopup, FieldCheckbox },
  mixins: [ModuleMixin],

  data() {
    return {
      setting: { compare: false },
      popup: { show: false }
    };
  },
  computed: {
    path() {
      return { icon: mdiCog };
    }
  },

  methods: {
    onInit() {
      this.setting = Object.assign({ compare: false }, this.$map.setting);
    },
    toggleShow() {
      this.popup.show = !this.popup.show;
    },
    onChangeSetting() {
      this.$map.changeSetting(this.setting);
    }
  }
};
</script>
<style>
.setting-container {
  padding: 8px;
}
</style>
