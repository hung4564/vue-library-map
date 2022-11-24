"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkmap_vue_libary"] = (typeof self !== 'undefined' ? self : this)["webpackChunkmap_vue_libary"] || []).push([[45],{

/***/ 9045:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ draggable_popup_desktop; }
});

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/draggable/draggable-popup/draggable-popup-desktop.vue?vue&type=template&id=c82925b4&scoped=true&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _vm.p_show ? _c('vue-drag-resize', _vm._b({
    attrs: {
      "dragHandle": ".drag",
      "h": _vm.p_height,
      "is-active": "",
      "minh": _vm.c_minHeight,
      "minw": _vm.c_minWidth,
      "parent-limitation": "",
      "parentH": _vm.c_parentHeight,
      "parentW": _vm.c_parentWidth,
      "sticks": _vm.sticks,
      "w": _vm.p_width,
      "x": _vm.p_x,
      "y": _vm.p_y,
      "z": _vm.zIndex
    },
    on: {
      "resizing": _vm.onResize
    }
  }, 'vue-drag-resize', _vm.$attrs, false), [_c('map-card', {
    staticClass: "draggable-popup-desktop",
    attrs: {
      "width": _vm.p_width,
      "height": _vm.p_height
    }
  }, [_c('div', {
    staticClass: "draggable-popup-desktop-heading"
  }, [_c('div', {
    staticClass: "draggable-popup-desktop-heading__content"
  }, [_c('map-icon', {
    staticClass: "drag grabbing"
  }, [_vm._v("mdi-drag")]), _c('div', {
    staticClass: "draggable-popup-desktop-heading__title"
  }, [_vm._t("title")], 2), _c('div', {
    staticClass: "map-spacer"
  }), _vm._t("extra-btn"), _vm.countPopup > 1 ? [_c('map-button', {
    attrs: {
      "disabled": _vm.isFirst,
      "icon": "",
      "small": ""
    },
    on: {
      "click": function ($event) {
        return _vm.onToBack();
      }
    }
  }, [_c('map-icon', {
    attrs: {
      "small": ""
    }
  }, [_vm._v("mdi-arrange-send-backward")])], 1), _c('map-button', {
    attrs: {
      "disabled": _vm.isLast,
      "icon": "",
      "small": ""
    },
    on: {
      "click": function ($event) {
        return _vm.onToFront();
      }
    }
  }, [_c('map-icon', {
    attrs: {
      "small": ""
    }
  }, [_vm._v("mdi-arrange-bring-forward")])], 1)] : _vm._e(), _c('map-button', {
    attrs: {
      "icon": "",
      "small": ""
    },
    on: {
      "click": _vm.toggleExpanded
    }
  }, [_c('map-icon', {
    attrs: {
      "small": ""
    }
  }, [_vm._v(_vm._s(_vm.isExpanded ? "mdi-arrow-up-drop-circle-outline" : "mdi-arrow-down-drop-circle-outline"))])], 1), !_vm.disableClose ? _c('map-button', {
    attrs: {
      "icon": "",
      "small": ""
    },
    on: {
      "click": _vm.onClose
    }
  }, [_c('map-icon', {
    attrs: {
      "small": ""
    }
  }, [_vm._v("mdi-close")])], 1) : _vm._e()], 2)]), _c('hr', {
    staticClass: "map-divider"
  }), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isExpanded,
      expression: "isExpanded"
    }],
    staticClass: "flex-grow-1 overflow-auto"
  }, [_vm._t("default")], 2)])], 1) : _vm._e();
};

var staticRenderFns = [];

// EXTERNAL MODULE: ./src/components/MapCard.vue + 4 modules
var MapCard = __webpack_require__(4188);
// EXTERNAL MODULE: ./src/components/MapIcon.vue + 5 modules
var MapIcon = __webpack_require__(3778);
// EXTERNAL MODULE: ./src/components/MapButton.vue + 5 modules
var MapButton = __webpack_require__(3642);
// EXTERNAL MODULE: ./node_modules/vue-drag-resize/dist/index.js
var dist = __webpack_require__(3955);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);
// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__(4806);
// EXTERNAL MODULE: ./src/components/draggable/draggable-popup/draggable-popup.mixin.js
var draggable_popup_mixin = __webpack_require__(4765);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/draggable/draggable-popup/draggable-popup-desktop.vue?vue&type=script&lang=js&






/* harmony default export */ var draggable_popup_desktopvue_type_script_lang_js_ = ({
  mixins: [draggable_popup_mixin/* default */.Z],
  components: {
    MapCard: MapCard/* default */.Z,
    MapIcon: MapIcon/* default */.Z,
    VueDragResize: (dist_default()),
    MapButton: MapButton/* default */.Z
  },
  props: {
    minWidth: {
      type: Number,
      default: 200
    },
    minHeigth: {
      type: Number,
      default: 50
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    sticks: {
      type: Array,
      default: () => ["bl", "br"]
    },
    top: {
      type: Number,
      default: undefined
    },
    left: {
      type: Number,
      default: undefined
    },
    bottom: {
      type: Number,
      default: undefined
    },
    right: {
      type: Number,
      default: undefined
    }
  },
  data: () => ({
    p_show: false,
    p_width: 200,
    p_height: 200,
    p_x: 0,
    p_y: 0
  }),
  inject: {},

  created() {
    this.p_x = 0;
    this.p_y = 0;
    this.p_height = this.height;
    this.p_width = this.width;
  },

  watch: {
    height: {
      handler(val) {
        this.p_height = val;
      }

    },
    width: {
      handler(val) {
        this.p_width = val;
      }

    },
    show: {
      handler(val) {
        if (val) {
          if (!(0,lodash.isNil)(this.left)) {
            this.p_x = this.left;
          }

          if (!(0,lodash.isNil)(this.top)) {
            this.p_y = this.top;
          }

          if (!(0,lodash.isNil)(this.right)) {
            this.p_x = this.c_parentWidth - this.right - this.p_width;
          }

          if (!(0,lodash.isNil)(this.bottom)) {
            this.p_y = this.c_parentHeight - this.bottom - this.p_height;
          }
        }

        this.p_show = val;
      },

      immediate: true
    }
  },
  computed: {
    c_show: {
      get() {
        return this.p_show;
      },

      set(val) {
        this.p_show = val;
        this.$emit("update:show", val);
      }

    },

    isExpanded() {
      return this.p_height > 50;
    },

    c_minWidth() {
      return this.minWidth;
    },

    c_minHeight() {
      return this.minHeigth;
    }

  },
  methods: {
    toggleExpanded() {
      this.p_height = !this.isExpanded ? this.height : 50;
    },

    onClose() {
      this.c_show = false;
    },

    onResize(newRect) {
      this.p_width = newRect.width;
      this.p_height = newRect.height;
    }

  }
});
;// CONCATENATED MODULE: ./src/components/draggable/draggable-popup/draggable-popup-desktop.vue?vue&type=script&lang=js&
 /* harmony default export */ var draggable_popup_draggable_popup_desktopvue_type_script_lang_js_ = (draggable_popup_desktopvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/draggable/draggable-popup/draggable-popup-desktop.vue?vue&type=style&index=0&id=c82925b4&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/draggable/draggable-popup/draggable-popup-desktop.vue?vue&type=style&index=0&id=c82925b4&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1001);
;// CONCATENATED MODULE: ./src/components/draggable/draggable-popup/draggable-popup-desktop.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  draggable_popup_draggable_popup_desktopvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "c82925b4",
  null
  
)

/* harmony default export */ var draggable_popup_desktop = (component.exports);

/***/ }),

/***/ 4765:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

/* harmony default export */ __webpack_exports__["Z"] = ({
  props: {
    show: Boolean,
    id: {
      type: String,
      required: true
    },
    parentWidth: {
      type: Number,
      default: 0
    },
    parentHeight: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 0
    },
    disableClose: {
      type: Boolean,
      default: false
    }
  },
  inject: ["$parentHeight", "$parentWidth", "$popupIds", "setLayerToFront", "setLayerToBack", "checkIsLast", "checkIsFirst", "option"],
  data: () => ({
    isLast: false,
    isFirst: false
  }),
  watch: {
    zIndex: {
      handler: "updateZIndex",
      immediate: true
    },
    c_popupIds: {
      handler: "updateZIndex"
    }
  },
  computed: {
    isUseSidebar() {
      return this.id == this.currentIdShowInSideBar;
    },

    c_show: {
      get() {
        return this.show;
      },

      set(val) {
        this.$emit("update:show", val);
      }

    },

    c_popupIds() {
      return this.$popupIds ? this.$popupIds() : [];
    },

    countPopup() {
      return this.c_popupIds.length;
    },

    c_parentWidth() {
      return this.parentWidth || this.$parentWidth();
    },

    c_parentHeight() {
      return this.parentHeight || this.$parentHeight();
    },

    isMobile() {
      return this.option.isMobile;
    }

  },
  methods: {
    onToBack() {
      this.setLayerToBack(this.id);
    },

    onToFront() {
      this.setLayerToFront(this.id);
    },

    updateZIndex() {
      this.isLast = this.checkIsLast(this.id);
      this.isFirst = this.checkIsFirst(this.id);
    }

  }
});

/***/ })

}]);
//# sourceMappingURL=map.common.45.js.map