<template>
  <div class="loader">
    <span class="loader__visual"></span>
  </div>
</template>

<script>
export default {
  name: "ULoader",
};
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  align-content: center;
  justify-content: center;

  &__visual {
    width: 48px;
    height: 48px;
    border: 5px solid #000000;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
