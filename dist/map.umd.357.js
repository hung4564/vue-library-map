"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkmap"] = (typeof self !== 'undefined' ? self : this)["webpackChunkmap"] || []).push([[357],{

/***/ 357:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ draggable_popup_mobile; }
});

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/draggable/draggable-popup/draggable-popup-mobile.vue?vue&type=template&id=51f24990&scoped=true&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.c_show,
      expression: "c_show"
    }],
    staticClass: "popup-mobile-container",
    class: {
      'full-height': _vm.isFullScreen
    },
    style: {
      zIndex: _vm.zIndex,
      height: _vm.isFullScreen ? '100%' : '45%'
    }
  }, [_c('map-card', {
    staticClass: "draggable-popup-mobile"
  }, [_c('div', {
    staticClass: "draggable-popup-mobile-heading"
  }, [_c('div', {
    staticClass: "draggable-popup-mobile-heading__title"
  }, [_vm._t("title")], 2), _c('div', {
    staticClass: "draggable-popup-mobile-heading__content"
  }), _c('div', {
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
  }, [_c('map-icon', [_vm._v("mdi-arrange-send-backward")])], 1), _c('map-button', {
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
  }, [_c('map-icon', [_vm._v("mdi-arrange-bring-forward")])], 1)] : _vm._e(), _c('map-button', {
    attrs: {
      "icon": "",
      "small": ""
    },
    on: {
      "click": function ($event) {
        return _vm.onFullScreen();
      }
    }
  }, [_vm.isFullScreen ? _c('map-icon', [_vm._v(" mdi-arrow-down-drop-circle-outline ")]) : _c('map-icon', [_vm._v(" mdi-arrow-up-drop-circle-outline ")])], 1), !_vm.disableClose ? _c('map-button', {
    attrs: {
      "icon": "",
      "small": ""
    },
    on: {
      "click": _vm.onClose
    }
  }, [_c('map-icon', [_vm._v("mdi-close")])], 1) : _vm._e()], 2), _c('hr', {
    staticClass: "map-divider"
  }), _c('div', {
    staticClass: "flex-grow-1 overflow-auto"
  }, [_vm._t("default")], 2)])], 1);
};

var staticRenderFns = [];

// EXTERNAL MODULE: ./src/components/MapCard.vue + 4 modules
var MapCard = __webpack_require__(6890);
// EXTERNAL MODULE: ./src/components/MapIcon.vue + 5 modules
var MapIcon = __webpack_require__(3839);
// EXTERNAL MODULE: ./src/components/MapButton.vue + 5 modules
var MapButton = __webpack_require__(544);
// EXTERNAL MODULE: ./src/components/draggable/draggable-popup/draggable-popup.mixin.js
var draggable_popup_mixin = __webpack_require__(423);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/draggable/draggable-popup/draggable-popup-mobile.vue?vue&type=script&lang=js&




/* harmony default export */ var draggable_popup_mobilevue_type_script_lang_js_ = ({
  components: {
    MapIcon: MapIcon/* default */.Z,
    MapButton: MapButton/* default */.Z,
    MapCard: MapCard/* default */.Z
  },
  mixins: [draggable_popup_mixin/* default */.Z],
  props: {},
  data: () => ({
    isFullScreen: false
  }),
  watch: {},
  computed: {},
  methods: {
    onFullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },

    onClose() {
      this.c_show = false;
    }

  }
});
;// CONCATENATED MODULE: ./src/components/draggable/draggable-popup/draggable-popup-mobile.vue?vue&type=script&lang=js&
 /* harmony default export */ var draggable_popup_draggable_popup_mobilevue_type_script_lang_js_ = (draggable_popup_mobilevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/draggable/draggable-popup/draggable-popup-mobile.vue?vue&type=style&index=0&id=51f24990&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/draggable/draggable-popup/draggable-popup-mobile.vue?vue&type=style&index=0&id=51f24990&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1001);
;// CONCATENATED MODULE: ./src/components/draggable/draggable-popup/draggable-popup-mobile.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  draggable_popup_draggable_popup_mobilevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "51f24990",
  null
  
)

/* harmony default export */ var draggable_popup_mobile = (component.exports);

/***/ }),

/***/ 423:
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
//# sourceMappingURL=map.umd.357.js.map