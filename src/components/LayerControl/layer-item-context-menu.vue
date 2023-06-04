<template>
  <ul class="layer-context-menu" v-click-outside="onClickOutside">
    <li
      v-for="(option, index) in options"
      :key="index"
      @click.stop="optionClicked(option)"
      class="layer-context-menu__item"
      :class="[
        option.class,
        option.type === 'divider' ? 'layer-context-menu__divider' : ''
      ]"
    >
      <span v-html="option.name"></span>
    </li>
  </ul>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  name: "VueSimpleContextMenu",
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      item: null,
      menuWidth: null,
      menuHeight: null
    };
  },
  methods: {
    show(...params) {
      this.showMenu(...params);
    },
    close(...params) {
      this.hideContextMenu(...params);
    },
    showMenu(event, item) {
      this.item = item;

      var menu = this.$el;
      if (!menu) {
        return;
      }

      if (!this.menuWidth || !this.menuHeight) {
        menu.style.visibility = "hidden";
        menu.style.display = "block";
        this.menuWidth = menu.offsetWidth;
        this.menuHeight = menu.offsetHeight;
        menu.removeAttribute("style");
      }

      if (this.menuWidth + event.pageX >= window.innerWidth) {
        menu.style.left = event.pageX - this.menuWidth + 2 + "px";
      } else {
        menu.style.left = event.pageX - 2 + "px";
      }

      if (this.menuHeight + event.pageY >= window.innerHeight) {
        menu.style.top = event.pageY - this.menuHeight + 2 + "px";
      } else {
        menu.style.top = event.pageY - 2 + "px";
      }

      menu.classList.add("layer-context-menu--active");
    },
    hideContextMenu() {
      const element = this.$el;
      if (element) {
        element.classList.remove("layer-context-menu--active");
        this.$emit("menu-closed");
      }
    },
    onClickOutside() {
      this.hideContextMenu();
    },
    optionClicked(option) {
      this.hideContextMenu();
      this.$emit("click:option", {
        item: this.item,
        menu: option
      });
    },
    onEscKeyRelease(event) {
      if (event.keyCode === 27) {
        this.hideContextMenu();
      }
    }
  },
  mounted() {
    document.body.addEventListener("keyup", this.onEscKeyRelease);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.onEscKeyRelease);
  }
};
</script>

<style lang="scss">
$light-grey: #ecf0f1;
$grey: darken($light-grey, 15%);
$blue: #004e98;
$white: #fff;
$black: #333;

.layer-context-menu {
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: none;
  list-style: none;
  position: absolute;
  z-index: 1000000;
  background-color: $light-grey;
  border-bottom-width: 0px;
  box-shadow: 0 3px 6px 0 rgba($black, 0.2);

  &--active {
    display: block;
  }

  &__item {
    display: flex;
    color: $black;
    cursor: pointer;
    padding: 5px 15px;
    align-items: center;
    min-height: 45px;

    &:hover {
      background-color: $blue;
      color: $white;
    }
  }

  &__divider {
    box-sizing: content-box;
    height: 2px;
    background-color: $grey;
    padding: 4px 0;
    background-clip: content-box;
    pointer-events: none;
  }

  // Have to use the element so we can make use of `first-of-type` and
  // `last-of-type`
  li {
    &:first-of-type {
      margin-top: 4px;
    }

    &:last-of-type {
      margin-bottom: 4px;
    }
  }
}
</style>
