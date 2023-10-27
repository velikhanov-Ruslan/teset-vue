<template>
  <div class="products-filter">
    <div class="products-filter__filters">
      <UInput v-model="searchText" placeholder="Поиск" />
      <USelect :options="options" v-model="selectOption" />
      <UButton title="Применить" @click="onAppyFilterParams" />
    </div>
    <div>
      <UCheckBox
        v-model="checkedAllItems"
        :label="checkedAllItems ? 'Снять все' : 'Выделить все'"
        @update="onCheckedAll"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script>
import UButton from "./ui/UButton.vue";
import UCheckBox from "./ui/UCheckBox.vue";
import UInput from "./ui/UInput.vue";
import USelect from "./ui/USelect.vue";

export default {
  name: "ProductFilters",
  components: {
    UInput,
    USelect,
    UButton,
    UCheckBox,
  },
  emits: ["appyFilter", "checkedAll"],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchText: JSON.parse(localStorage.getItem("filters"))?.search ?? "",
      checkedAllItems: false,
      selectOption: JSON.parse(localStorage.getItem("filters"))?.sort ?? "",
      options: [
        { value: "", label: "Сортировка по:", disabled: true },
        { value: "name asc", label: "По названию ask" },
        { value: "name desc", label: "По названию desc" },
        { value: "id asc", label: "По ID ask" },
        { value: "id desc", label: "По ID desc" },
      ],
    };
  },
  methods: {
    onAppyFilterParams() {
      if (!this.searchText.trim() && !this.selectOption) return;

      const params = {
        search: this.searchText,
        sort: this.selectOption,
      };

      this.$emit("appyFilter", params);
    },
    onCheckedAll(v) {
      this.checkedAllItems = v;
      this.$emit("checkedAll", this.checkedAllItems);
    },
  },
};
</script>

<style lang="scss" scoped>
.products-filter {
  margin-bottom: 45px;

  &__filters {
    display: flex;
    align-items: stretch;
    gap: 30px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }
}
</style>
