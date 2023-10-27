<template>
  <label class="UCheckbox">
    {{ label }}
    <input
      :disabled="disabled"
      type="checkbox"
      :checked="value"
      @change="onChange($event.target.checked)"
    />
  </label>
</template>

<script>
export default {
  name: "UCheckBox",
  data() {
    return {
      checked: false,
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
  },
  methods: {
    onChange(e) {
      this.checked = e;
      this.$emit("update", this.checked);
    },
  },
};
</script>

<style lang="scss" scoped>
.UCheckbox {
  display: flex;
  align-items: stretch;
  gap: 5px;
}
</style>
