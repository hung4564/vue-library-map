<template>
  <ModuleContainer v-bind="$attrs">
    <template #draggable="props">
      <DraggablePopup
        v-bind="Object.assign(props, popUpPosition)"
        v-if="c_show"
        :show.sync="c_show"
        :title="$map.trans('map.measurement.setting.title')"
      >
        <div class="setting-container">
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

          <div class="field-container">
            <div class="label-container">
              <div class="label-field">
                {{ $map.trans("map.measurement.setting.field.data") }}
              </div>
              <div>
                <button
                  @click="onFlyTo"
                  :disabled="!model || model.lenght < 1"
                  class="setting-button"
                  :title="$map.trans('map.measurement.action.fly-to')"
                >
                  <SvgIcon
                    :size="16"
                    type="mdi"
                    :path="path.fillBound"
                    :title="$map.trans('map.measurement.action.download')"
                  />
                </button>
                <button @click="onDownload" class="setting-button">
                  <SvgIcon
                    :size="16"
                    type="mdi"
                    :path="path.download"
                    :title="$map.trans('map.measurement.action.add-point')"
                  />
                </button>
                <button
                  @click="onAddItem"
                  class="setting-button"
                  v-if="isCanAdd"
                >
                  <SvgIcon :size="16" type="mdi" :path="path.add" />
                </button>
              </div>
            </div>
            <div class="geometry-list-container">
              <div
                class="geometry-list-item"
                v-for="(item, index) in model"
                :key="index"
              >
                <div> #{{ index }} </div>
                <div class="">
                  <input
                    class="setting-input"
                    v-model="model[index][0]"
                    type="number"
                    step="any"
                    @change="onUpdatePathItem(index)"
                  />
                </div>
                <div class="">
                  <input
                    class="setting-input"
                    v-model="model[index][1]"
                    type="number"
                    step="any"
                    @change="onUpdatePathItem(index)"
                  />
                </div>
                <div class="">
                  <button @click="onDeleteItem(index)" class="setting-button">
                    <SvgIcon :size="16" type="mdi" :path="path.delete" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DraggablePopup>
    </template>
    <slot />
  </ModuleContainer>
</template>

<script>
import { DraggablePopup } from "@hungpv97/vue-library-draggable";
import ModuleMixin from "@map/mixins/ModuleMixin";
import { fitBounds } from "@/helper";
import {
  mdiCrosshairsGps,
  mdiPlus,
  mdiDeleteOutline,
  mdiDownloadOutline,
  mdiUploadOutline
} from "@mdi/js";
import { lineString, point, polygon } from "@turf/helpers";
import FileSaver from "file-saver";

export default {
  components: { DraggablePopup },
  props: {
    maxLength: { type: Number, default: 0 },
    value: {
      type: Array,
      default: () => [[0, 0]]
    },
    fields: {
      type: Array,
      default: () => [{ text: "Status", value: "waiting..." }]
    },
    show: Boolean,
    popUpPosition: {
      type: Object,
      default: () => ({
        top: 50,
        right: 40,
        width: 350,
        height: 300
      })
    }
  },
  mixins: [ModuleMixin],
  data: () => ({}),
  computed: {
    c_show: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("update:show", value);
        if (!value) {
          this.$emit("close");
        }
      }
    },
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    isCanAdd() {
      return !this.maxLength || this.value.length < this.maxLength;
    },
    path() {
      return {
        add: mdiPlus,
        fillBound: mdiCrosshairsGps,
        delete: mdiDeleteOutline,
        download: mdiDownloadOutline,
        upload: mdiUploadOutline
      };
    }
  },
  watch: {},

  methods: {
    onFlyTo() {
      fitBounds(this.map, this.convertGeometry(this.model));
    },
    onAddItem() {
      this.model.push([null, null]);
    },
    onDeleteItem(index) {
      this.model.splice(index, 1);
      this.$emit("click:remove", index);
      this.submit(this.model);
    },
    onUpdatePathItem() {
      this.submit(this.model);
    },
    submit(value) {
      this.$emit("input", value);
    },
    onDownload() {
      let geojson = {
        type: "FeatureCollection",
        features: [this.convertGeometry(this.model)]
      };
      const blob = new window.Blob([JSON.stringify(geojson)], {
        type: "text/plain;charset=utf-8"
      });

      FileSaver.saveAs(blob, "geojson.json");
    },
    convertGeometry(coordinates) {
      if (coordinates.length == 1) {
        return point(coordinates[0]);
      }
      if (coordinates.length == 2) {
        return lineString(coordinates);
      }
      return polygon([[...coordinates, coordinates[0]]]);
    }
  }
};
</script>
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
}
.label-container .label-field {
  flex-grow: 1;
}
.field-container {
  padding: 12px;
}
.setting-container {
  padding: 8px;
  color: #fff;
}
.setting-container .setting-button {
  background-color: transparent;
  color: #fff;
  position: relative;
  cursor: pointer;
  display: inline-flex;
  overflow: hidden;
  vertical-align: middle;
  box-shadow: none;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  line-height: 24px;
  align-items: center;
  justify-content: center;
  color: inherit;
}
.setting-container .setting-input {
  padding: 8px;
  display: block;
  border: none;
  border-bottom: 1px solid #ccc;
  color: inherit;
  width: 100%;
  background-color: transparent;
}
.geometry-list-item {
  display: flex;
  align-items: center;
  margin-right: -4px;
  margin-left: -4px;
}
.geometry-list-item > div {
  padding: 4px;
  color: inherit;
  background-color: transparent;
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
