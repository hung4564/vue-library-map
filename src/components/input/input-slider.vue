<template>
  <div class="form-group">
    <label v-if="label">
      {{ label }}
    </label>
    <div class="input-container">
      <input
        :value="form"
        @input="({ target }) => (form = parseFloat(target.value))"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :style="{ backgroundSize: backgroundSize }"
        :disabled="disabled"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    value: {},
    min: {
      default: 0
    },
    max: {
      default: 100
    },
    step: {
      default: 1
    },
    disabled: Boolean
  },
  computed: {
    backgroundSize() {
      return ((this.value - this.min) * 100) / (this.max - this.min) + "% 100%";
    },
    form: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style scoped>
input[type="range"] {
  display: block;
  width: 100%;
  margin: 8px 0;
  background: #3e3e3f;
  background-image: -webkit-gradient(
    linear,
    20% 0%,
    20% 100%,
    color-stop(0%, #004e98),
    color-stop(100%, #004e98)
  );
  background-image: -webkit-linear-gradient(left, #004e98 0%, #004e98 100%);
  background-image: -moz-linear-gradient(left, #004e98 0%, #004e98 100%);
  background-image: -o-linear-gradient(to right, #004e98 0%, #004e98 100%);
  background-image: linear-gradient(to right, #004e98 0%, #004e98 100%);
  background-repeat: no-repeat;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  box-shadow: none;
  background: transparent;
  border-radius: 0px;
  border: none;
}
input[type="range"]::-webkit-slider-thumb {
  box-shadow: none;
  border: 4px solid #004e98;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #3e3e3f;
  cursor: pointer;
  margin-top: -6px;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: transparent;
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  box-shadow: none;
  background: transparent;
  border-radius: 0px;
  border: none;
}
input[type="range"]::-moz-range-thumb {
  box-shadow: none;
  border: 4px solid #004e98;
  height: 16px;
  width: 16px;
  border-radius: 2px;
  background: #ffffff;
  cursor: pointer;
}
input[type="range"]::-ms-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: transparent;
  border: none;
  border-radius: 0px;
  box-shadow: none;
}
input[type="range"]::-ms-fill-upper {
  background: transparent;
  border: none;
  border-radius: 0px;
  box-shadow: none;
}
input[type="range"]::-ms-thumb {
  box-shadow: none;
  border: 4px solid #004e98;
  height: 16px;
  width: 16px;
  border-radius: 2px;
  background: #ffffff;
  cursor: pointer;
  height: 4px;
}
input[type="range"]:focus::-ms-fill-lower {
  background: transparent;
}
input[type="range"]:focus::-ms-fill-upper {
  background: transparent;
}
</style>
