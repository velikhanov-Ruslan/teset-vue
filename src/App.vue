<template>
  <div id="app">
    <BasketProducts :total-products="totalBasketProducts" />
    <ProductLayuot @update:basket="onUpdate" />
  </div>
</template>

<script>
import "./assets/style.scss";
import BasketProducts from "./components/BasketProducts.vue";
import ProductLayuot from "./components/ProductLayout.vue";

export default {
  name: "App",
  components: {
    BasketProducts,
    ProductLayuot,
  },
  data() {
    return {
      totalBasketProducts:
        JSON.parse(localStorage.getItem("basket"))?.length ?? 0,
    };
  },
  methods: {
    onUpdate() {
      this.totalBasketProducts = JSON.parse(
        localStorage.getItem("basket")
      )?.length;
    },
  },
};
</script>

<style lang="scss">
#app {
  padding: 50px 30px;
}
</style>
