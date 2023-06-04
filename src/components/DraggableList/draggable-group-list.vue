<template>
  <draggable
    v-model="treeLayer"
    class="draggable-group-container"
    ghostClass="ghost"
    :group="{
      name: 'layers',
      pull: true,
      put: true
    }"
    handle=".draggable-handle"
    @choose="onChooseGroupItem"
    @end="onEnd($event)"
  >
    <template v-for="(layerGroup, index) in treeLayer">
      <div
        v-if="layerGroup.isGroup"
        :key="layerGroup.id + '_' + index"
        class="draggable__item"
      >
        <DraggableListItem
          :disabledDrag="disabledDrag"
          class="draggable-group__item"
        >
          <div class="draggable-group__info">
            <span class="draggable-group__title" :title="layerGroup.name">
              {{ layerGroup.name }}
            </span>
            <div class="draggable-group__action">
              <template
                v-if="layerGroup.children && layerGroup.children.length > 0"
              >
                <span @click="toggleShow(layerGroup, index)">
                  <SvgIcon
                    size="14"
                    type="mdi"
                    :path="path.group.show"
                    v-if="layerGroup.show"
                  />
                  <SvgIcon
                    size="14"
                    type="mdi"
                    :path="path.group.hide"
                    v-else
                  />
                </span>
                <span @click="unGroup(layerGroup, index)">
                  <SvgIcon size="14" type="mdi" :path="path.group.unGroup" />
                </span>
              </template>

              <span @click="deleteGroup(layerGroup, index)">
                <SvgIcon size="14" type="mdi" :path="path.group.delete" />
              </span>
              <span @click="toggleShowChildrenGroup(layerGroup.id)">
                <SvgIcon
                  size="14"
                  type="mdi"
                  :path="path.group.close"
                  v-if="isGroupShow[layerGroup.id]"
                />
                <SvgIcon size="14" type="mdi" :path="path.group.open" v-else />
              </span>
            </div>
          </div>
          <div
            v-if="isGroupShow[layerGroup.id]"
            class="draggable-group__divider"
          ></div>
          <div
            :class="{
              'draggable-group__children-container': isGroupShow[layerGroup.id]
            }"
          >
            <div
              v-if="!layerGroup.children || layerGroup.children.length < 1"
              class="draggable-group__nodata"
            >
              Drag layer inside this group
            </div>
            <draggable
              v-show="isGroupShow[layerGroup.id]"
              v-model="layerGroup.children"
              ghostClass="ghost"
              :group="{
                name: 'layers',
                pull: true,
                put: checkItemCanPutInChildren
              }"
              handle=".draggable-handle"
              @end="onEnd($event)"
              class="draggable-group__children"
            >
              <div
                v-for="(element, element_index) in layerGroup.children"
                :key="element.id + '_' + index + '_' + element_index"
                class="draggable__item"
              >
                <DraggableListItem
                  :disabledDrag="disabledDrag"
                  :isSelected="currentSelectId.includes(element.id)"
                  :item="element"
                >
                  <slot
                    :group="layerGroup"
                    :isSelected="currentSelectId.includes(element.id)"
                    :item="element"
                    name="item"
                    :toggleSelect="toggleSelect"
                  ></slot>
                </DraggableListItem>
              </div>
            </draggable>
          </div>
        </DraggableListItem>
      </div>
      <div
        v-else
        :key="layerGroup.id + '_' + index + '_else'"
        class="draggable__item"
      >
        <DraggableListItem
          :disabledDrag="disabledDrag"
          :isSelected="currentSelectId.includes(layerGroup.id)"
          :item="layerGroup"
        >
          <slot
            :isSelected="currentSelectId.includes(layerGroup.id)"
            :item="layerGroup"
            :index="index"
            name="item"
            :toggleSelect="toggleSelect"
          ></slot>
        </DraggableListItem>
      </div>
    </template>
  </draggable>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import draggable from "vuedraggable";

import DraggableListItem from "./draggable-list-item.vue";
import {
  mdiChevronDown,
  mdiChevronUp,
  mdiDelete,
  mdiEye,
  mdiEyeOff,
  mdiUngroup
} from "@mdi/js";
export default {
  components: { draggable, DraggableListItem, SvgIcon },
  props: {
    items: { type: Array, required: true },
    selected: { type: Array, default: () => [] },
    groupShow: { type: Object, default: () => ({}) },
    disabledSelect: Boolean,
    disabledDrag: Boolean
  },
  data: () => ({
    treeLayer: [],
    isGroupEdit: {},
    currentSelectLayerObject: {},
    currentItemDrag: undefined
  }),
  computed: {
    path() {
      return {
        group: {
          open: mdiChevronUp,
          close: mdiChevronDown,
          unGroup: mdiUngroup,
          delete: mdiDelete,
          show: mdiEye,
          hide: mdiEyeOff
        }
      };
    },
    currentSelectId: {
      get() {
        return this.selected;
      },
      set(value) {
        this.$emit("update:selected", value);
      }
    },
    isGroupShow: {
      get() {
        return this.groupShow;
      },
      set(value) {
        this.$emit("update:groupShow", value);
      }
    }
  },
  mounted() {
    this.update(this.items);
  },
  methods: {
    update(items = []) {
      if (items == null) {
        items = this.items;
      }
      let treeLayer = this.convertListToTree(items);
      this.treeLayer = treeLayer;
    },
    convertListToTree(value) {
      let treeLayer = [];
      if (!value || value.length == 0) {
        return treeLayer;
      }
      let group_cache = {};
      value.forEach((x) => {
        if (!x.group) {
          treeLayer.push(x);
          return;
        }
        if (!group_cache[x.group.id]) {
          group_cache[x.group.id] = createDefaultGroup(x.group);
          treeLayer.push(group_cache[x.group.id]);

          this.isGroupShow[x.group.id] = true;
        }
        let group = group_cache[x.group.id];

        group.children.push(x);
      });
      return treeLayer;
    },
    convertTreeToList(tree) {
      return tree.reduce((acc, cur) => {
        if (cur.isGroup) {
          if (cur.children.length > 0) {
            acc.push(
              ...cur.children.map((x) => {
                x.group = { id: cur.id, name: cur.name };
                return x;
              })
            );
          }
        } else {
          cur.group = undefined;
          acc.push(cur);
        }
        return acc;
      }, []);
    },
    removeSelect(layer) {
      if (this.currentSelectId.includes(layer.id)) {
        this.currentSelectId = this.currentSelectId.filter(
          (x) => x != layer.id
        );
      }
    },
    toggleSelect(layer) {
      if (this.disabledSelect) return;
      if (this.currentSelectId.includes(layer.id)) {
        this.currentSelectId = this.currentSelectId.filter(
          (x) => x != layer.id
        );
      } else {
        this.currentSelectId.push(layer.id);
        this.currentSelectLayerObject[layer.id] = layer;
      }
    },
    editGroup(groupId) {
      this.isGroupEdit[groupId] = true;
      this.$forceUpdate();
    },
    saveGroup(groupId) {
      this.isGroupEdit[groupId] = false;
      this.$forceUpdate();
    },
    toggleShowChildrenGroup(groupId) {
      this.isGroupShow[groupId] = !this.isGroupShow[groupId];
      this.$forceUpdate();
    },
    addNewGroup(name) {
      let children = [];
      if (this.currentSelectId && this.currentSelectId.length > 0) {
        //remove layer from old
        this.treeLayer = this.treeLayer
          .filter((layerGroup) => !this.currentSelectId.includes(layerGroup.id))
          .map((layerGroup) => {
            if (layerGroup.isGroup) {
              layerGroup.children = layerGroup.children.filter(
                (layer) => !this.currentSelectId.includes(layer.id)
              );
            }
            return layerGroup;
          });
        // add select item to group
        children = this.currentSelectId.map(
          (x) => this.currentSelectLayerObject[x]
        );
        this.currentSelectId = [];
        this.currentSelectLayerObject = {};
      }
      let group = createDefaultGroup({ name: name || "New Group", children });
      this.treeLayer.unshift(group);
      this.isGroupShow[group.id] = true;
      if (group.children.length > 0) this.onEnd();
    },
    unGroup(group, groupIndex) {
      this.treeLayer.splice(groupIndex, 1);
      if (group.children.length > 0) {
        this.treeLayer.splice(groupIndex, 0, ...group.children);
      }
    },
    onChooseGroupItem(e) {
      this.currentItemDrag = this.treeLayer[e.oldIndex];
    },
    onEnd() {
      this.currentItemDrag = undefined;

      this.$emit("update:items", this.convertTreeToList(this.treeLayer));
      setTimeout(() => {
        this.$emit("click-drag:done");
      }, 0);
    },
    checkItemCanPutInChildren() {
      // only 2 lever, group can't drag to other group
      return !(this.currentItemDrag && this.currentItemDrag.isGroup);
    },
    deleteGroup(group, groupIndex) {
      this.treeLayer.splice(groupIndex, 1);
      this.$emit("click-group:remove", group);
    },
    toggleShow(group) {
      group.show = !group.show;
      this.$emit("click-group:toggle-show", group);
    }
  }
};
function createDefaultGroup(group) {
  let temp = {
    id: `group-${new Date().getTime()}`,
    name: "New Group",
    isGroup: true,
    show: true,
    children: []
  };
  temp = Object.assign({}, temp, group);
  return temp;
}
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
:deep(.no-move) {
  transition: transform 0s;
}
:deep(.ghost) {
  opacity: 0.2;
  background: #004e98;
}
.draggable-handle {
  cursor: all-scroll;
}
.draggable-group-container {
  height: 100%;
}
.draggable-group__item .draggable__item:last-child {
  padding-bottom: 0px;
}
.draggable__item {
  padding-bottom: 12px;
}
.draggable-group__info {
  display: flex;
  padding-bottom: 4px;
  justify-content: center;
  align-items: center;
}
.draggable-group__title {
  display: inline-flex;
  text-align: left;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.draggable-group__action {
  flex-grow: 0;
  display: flex;
}
.draggable-group__action span {
  cursor: pointer;
  display: inline-block;
  margin-left: 8px;
}
.draggable-group__children-container,
.draggable-group__children {
  min-height: 80px;
}
.draggable-group__children-container {
  position: relative;
}
.draggable-group__nodata {
  position: absolute;
  z-index: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
</style>
