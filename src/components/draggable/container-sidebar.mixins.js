export default {
  props: {},
  data: () => ({
    sidebarIds: [],
    sidebarUpAction: {},
    sidebarIdsShow: []
  }),
  provide() {
    return {
      //sidebar
      registerSidebar: this.registerSidebar,
      unRegisterSidebar: this.unRegisterSidebar,
      setSidebarToBack: this.setSidebarToBack,
      registerSidebarShow: this.registerSidebarShow
    };
  },
  watch: {},
  computed: {},
  methods: {
    registerSidebarShow(id, show) {
      if (!id) return;
      this.setSidebarShowId(id, show);
      this.updateAllSidebarIndex();
    },
    registerSidebar(id, { getTitle, setIndex, right } = {}) {
      if (!id) return;
      if (!this.sidebarIds.includes(id)) {
        this.sidebarIds.push(id);
      }
      this.sidebarUpAction[id] = { setIndex, getTitle, right };
    },
    unRegisterSidebar(id) {
      this.setSidebarShowId(id, false);
      this.$delete(this.sidebarUpAction, id);
    },
    setSidebarShowId(id, show) {
      let sidebarIdsShow = this.sidebarIdsShow;
      if (show && !sidebarIdsShow.includes(id)) {
        sidebarIdsShow.push(id);
      } else if (!show) {
        var index = sidebarIdsShow.indexOf(id);
        if (index !== -1) {
          sidebarIdsShow.splice(index, 1);
        }
      }
      this.sidebarIdsShow = sidebarIdsShow;
    },
    updateAllSidebarIndex() {
      let left_count = 0,
        right_count = 0;
      this.sidebarIdsShow.forEach((value, index) => {
        let sidebar = this.sidebarUpAction[value];
        sidebar.right ? right_count++ : left_count++;
        sidebar.setIndex(index < 0 ? 1 : index + 2, {
          count: sidebar.right ? right_count : left_count
        });
      });
    },
    setSidebarToBack(id) {
      let index = this.sidebarIdsShow.findIndex((x) => x == id);
      this.sidebarIdsShow.splice(index, 1);
      this.sidebarIdsShow.unshift(id);
      this.updateAllSidebarIndex();
    }
  }
};
