<template>
  <div class="basket">
    <div>Корзина</div>
    <div class="basket__total">{{ totalProducts }}</div>
  </div>
</template>

<script>
export default {
  name: "BasketProducts",
  props: {
    totalProducts: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.basket {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
  padding: 15px;
  border: 1px solid rgb(107, 97, 97);
  border-radius: 3px;
  margin-bottom: 20px;

  &__total {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgb(107, 97, 97);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
