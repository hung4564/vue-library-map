<template>
  <div
    class="full-height sidebar-container"
    v-show="c_show"
    :class="{
      expand: c_expand,
      'left-sidebar-container': left,
      'right-sidebar-container': right
    }"
  >
    <v-card v-show="c_show" class="full-width full-height" flat>
      <slot />
    </v-card>

    <div v-if="!isMobile && c_show" class="complex-buton-close">
      <v-tooltip :left="right" :right="left" disabled>
        <template v-slot:activator="{ on, attrs }">
          <v-sheet
            v-bind="attrs"
            class="d-flex align-center"
            elevation="1"
            height="48px"
            width="23px"
            v-on="on"
            @click="c_expand = !c_expand"
          >
            <span v-if="left">
              <v-icon>{{
                c_expand ? "mdi-menu-left" : "mdi-menu-right"
              }}</v-icon>
            </span>
            <span v-else-if="right">
              <v-icon>{{
                !c_expand ? "mdi-menu-left" : "mdi-menu-right"
              }}</v-icon>
            </span>
          </v-sheet>
        </template>
        <span v-if="left">{{
          c_expand
            ? "Thu gọn bảng điều khiển bên cạnh"
            : "Mở rộng bảng điều khiển bên cạnh"
        }}</span>
        <span v-else-if="right"
          >{{
            !c_expand
              ? "Thu gọn bảng điều khiển bên cạnh"
              : "Mở rộng bảng điều khiển bên cạnh"
          }}
        </span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: { show: Boolean, right: Boolean },
  data: () => ({ p_show: true, p_expand: true }),
  computed: {
    left() {
      return !this.right;
    },
    c_show: {
      get() {
        return this.p_show;
      },
      set(value) {
        this.p_show = value;
        this.$emit("update:show", value);
      }
    },
    c_expand: {
      get() {
        return this.p_expand;
      },
      set(value) {
        this.p_expand = value;
        this.$emit("update:expand", value);
      }
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(value) {
        this.p_show = value;
      }
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.sidebar-container {
  position: absolute;
  pointer-events: all;
  z-index: 900;
  top: 0;
  transition: max-width 1s;
}

.sidebar-container {
  transition: all 0.2s ease;
}
.complex-buton-close {
  position: absolute;
  top: 50%;
}
.left-sidebar-container {
  left: 0;
}
.right-sidebar-container {
  right: 0;
}
.sidebar-container {
  width: 0;
}
</style>

<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
  .sidebar-container.expand {
    width: 100% !important;
  }
}
@media only screen and (min-width: 600px) and (max-width: 1264px) {
  .sidebar-container.expand {
    width: 320px;
  }
  .left-sidebar-container.expand {
    .complex-buton-close {
      left: 320px !important;
    }
  }
  .right-sidebar-container.expand {
    .complex-buton-close {
      right: 320px !important;
    }
  }
}
@media only screen and (min-width: 1264px) {
  .sidebar-container.expand {
    width: 400px;
  }
  .left-sidebar-container.expand {
    .complex-buton-close {
      left: 400px !important;
    }
  }
  .right-sidebar-container.expand {
    .complex-buton-close {
      right: 400px !important;
    }
  }
}
.sidebar-container {
  &.left-sidebar-container {
    .complex-buton-close {
      left: 0;
      transform: translateY(-50%);
    }
  }
  &.right-sidebar-container {
    .complex-buton-close {
      right: 0;
      transform: translateY(-50%);
    }
  }
}
</style>
