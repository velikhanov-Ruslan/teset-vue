<template>
  <div class="product-layout">
    <ProductFilters
      @appyFilter="onAppyFilters"
      @checkedAll="onCheckedAll"
      :disabled="!products.length"
    />

    <div v-if="!loading" class="product-layout__product-list">
      <ProductCard
        v-for="pr in products"
        :key="pr.id"
        :name="pr.name"
        :id="pr.id"
        :allCheckedItems="allSelected"
        :checkedArrayItems="checkedArrayItems"
        class="product-layout__product-list-item"
        @update:basket="onUpdate"
        @click:basket="onClick"
      />
    </div>

    <ULoader v-else />

    <div v-if="!products.length">Результатов нет</div>
  </div>
</template>

<script>
import ProductFilters from "./ProductFilters.vue";
import ProductCard from "./ProductCard.vue";
import { getFilteredProducts } from "@/services/products";
import ULoader from "./ULoader.vue";
import { getProducts } from "@/services/products";

export default {
  name: "ProductLayout",
  components: { ProductFilters, ProductCard, ULoader },
  emits: ["update:basket"],
  data() {
    return {
      responceFilteredProducts:
        JSON.parse(localStorage.getItem("filters"))?.filtered_products ?? [],
      loading: false,
      products: [],
      allSelected: JSON.parse(localStorage.getItem("basket")) ?? [],
      checkedArrayItems: [],
    };
  },
  methods: {
    onCheckedAll(v) {
      this.checkedArrayItems = v
        ? (this.checkedArrayItems = this.products.map(({ id }) => id))
        : [];
      localStorage.setItem("checkedAll", JSON.stringify(v));
    },
    async onAppyFilters(data) {
      this.$emit("update:filter", data);
      this.loading = true;

      const { search, sort } = data;

      try {
        const filtered_products = await getFilteredProducts(search, sort);
        this.products = filtered_products;
        localStorage.setItem(
          "filters",
          JSON.stringify({ search, sort, filtered_products })
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    onUpdate(v) {
      console.log("v:", v);
    },
    onClick(_id) {
      const match = this.allSelected.find((p) => p === _id);

      if (match) {
        this.allSelected = this.allSelected.filter((p) => p !== _id);
        localStorage.setItem("basket", JSON.stringify(this.allSelected));
        this.$emit("update:basket");
        return;
      }

      this.allSelected.push(_id);
      localStorage.setItem("basket", JSON.stringify(this.allSelected));
      this.$emit("update:basket");
    },
  },
  async mounted() {
    const localStorageProducts = JSON.parse(
      localStorage.getItem("filters")
    )?.filtered_products;
    if (localStorageProducts) {
      this.products = localStorageProducts;

      return;
    }

    try {
      this.loading = true;
      const products_res = await getProducts();
      this.products = products_res;
      setTimeout(() => (this.loading = false), 600); // имитация
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.product-layout {
  border: 1px solid rgb(107, 97, 97);
  padding: 15px;
  border-radius: 3px;

  &__product-list {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 15px;
  }

  &__product-list-item {
    width: 100%;
  }

  @media (min-width: 1440px) {
    &__product-list-item {
      width: calc((100% / 4) - 36px);
    }
  }
}
</style>
