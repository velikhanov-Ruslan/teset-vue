<template>
  <div>
    <select class="USelect" v-model="innerValue">
      <option
        :value="opt.value"
        v-for="opt in options"
        :key="opt.value"
        :disabled="opt.disabled"
        :selected="opt.value === innerValue"
      >
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "USelect",
  emits: ["input"],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    innerValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.USelect {
  height: 100%;
  padding: 0 8px;
}
</style>
