<template>
  <button class="UButton" @click="$emit('click')">{{ title }}</button>
</template>

<script>
export default {
  name: "UButton",
  emits: ['click'],
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.UButton {
  padding: 7px;
}
</style>
