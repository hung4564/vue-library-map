export default {
  data: () => ({
    popupIds: [],
    popupUpAction: {},
    popupIdsShow: []
  }),
  provide() {
    return {
      $parentHeight: () => this.parentHeight,
      $isMobile: () => this.isMobile,
      $popupIds: () => this.popupIdsShow,
      $parentWidth: () => this.parentWidth,
      registerPopup: this.registerPopup,
      unRegisterPopup: this.unRegisterPopup,
      setLayerToBack: this.setLayerToBack,
      setLayerToFront: this.setLayerToFront,
      checkIsLast: this.checkIsLast,
      checkIsFirst: this.checkIsFirst,
      registerPopupShow: this.registerPopupShow
    };
  },
  methods: {
    registerPopupShow(id, show) {
      if (!id) return;
      this.setPopupShowId(id, show);
      this.updateAllIndex();
    },
    setPopupShowId(id, show) {
      let popupIdsShow = this.popupIdsShow;
      if (show && !popupIdsShow.includes(id)) {
        popupIdsShow.push(id);
      } else if (!show) {
        var index = popupIdsShow.indexOf(id);
        if (index !== -1) {
          popupIdsShow.splice(index, 1);
        }
      }
      this.popupIdsShow = popupIdsShow;
    },
    checkIsLast(id) {
      if (this.popupIdsShow.length < 1) return false;
      return this.popupIdsShow[this.popupIdsShow.length - 1] == id;
    },
    checkIsFirst(id) {
      if (this.popupIdsShow.length < 1) return false;
      return this.popupIdsShow[0] == id;
    },
    onResize() {
      this.$nextTick(() => {
        this.parentHeight = this.$parent.$el.clientHeight;
        this.parentWidth = this.$parent.$el.clientWidth;
      });
    },
    registerPopup(id, { setIndex, getTitle } = {}) {
      if (!this.popupIds.includes(id)) {
        this.popupIds.push(id);
      }
      this.popupUpAction[id] = { setIndex, getTitle };
    },
    unRegisterPopup(id) {
      this.setPopupShowId(id, false);
      this.$delete(this.popupUpAction, id);
    },
    setLayerToBack(id) {
      let index = this.popupIdsShow.findIndex((x) => x == id);
      if (index > 0) {
        var b = this.popupIdsShow[index];
        this.popupIdsShow[index] = this.popupIdsShow[index - 1];
        this.popupIdsShow[index - 1] = b;
        this.updateAllIndex();
      }
    },
    setLayerToFront(id) {
      let index = this.popupIdsShow.findIndex((x) => x == id);
      if (index < this.popupIdsShow.length - 1) {
        var b = this.popupIdsShow[index];
        this.popupIdsShow[index] = this.popupIdsShow[index + 1];
        this.popupIdsShow[index + 1] = b;
        this.updateAllIndex();
      }
    },
    updateAllIndex() {
      this.popupIds.forEach((id) => {
        let index = this.popupIdsShow.findIndex((x) => x == id);
        this.popupUpAction[id].setIndex(index < 0 ? 1 : index + 2);
      });
    }
  }
};
