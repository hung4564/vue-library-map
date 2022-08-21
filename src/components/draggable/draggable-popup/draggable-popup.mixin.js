export default {
  props: {
    show: Boolean,
    id: { type: String, required: true },
    parentWidth: { type: Number, default: 0 },
    parentHeight: { type: Number, default: 0 },
    zIndex: { type: Number, default: 0 },
    disableClose: { type: Boolean, default: false }
  },
  inject: [
    "$parentHeight",
    "$parentWidth",
    "$popupIds",
    "setLayerToFront",
    "setLayerToBack",
    "checkIsLast",
    "checkIsFirst",
    "option"
  ],
  data: () => ({ isLast: false, isFirst: false }),
  watch: {
    zIndex: { handler: "updateZIndex", immediate: true },
    c_popupIds: { handler: "updateZIndex" }
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
};
