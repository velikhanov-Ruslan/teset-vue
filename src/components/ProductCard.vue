<template>
  <div class="product-card">
    <UCheckBox
      v-model="checkedCard"
      @update="onUpdate"
      :disabled="isDisabled"
    />
    <div style="align-self: center">
      <span style="padding-right: 5px">{{ name }}</span>
      <span>{{ id }}</span>
    </div>
    <UButton
      :title="isDisabled ? 'В корзине' : 'Добавить в корзину'"
      class="product-card__btn"
      @click="onAddToBasket"
    />
  </div>
</template>

<script>
import UButton from "./ui/UButton.vue";
import UCheckBox from "./ui/UCheckBox.vue";

export default {
  name: "ProductCard",
  components: { UCheckBox, UButton },
  emits: ["update:basket"],
  data() {
    return {
      checkedCard: false,
    };
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: null,
    },
    allCheckedItems: {
      type: Array,
      default: () => [],
    },
    checkedArrayItems: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onUpdate(v) {
      this.checkedCard = v;
      this.$emit("update:basket", { value: v, id: this.$props.id });
    },
    onAddToBasket() {
      if (this.checkedCard) {
        this.checkedCard = false;
      }

      this.$emit("click:basket", this.$props.id, this.checkedCard);
    },
  },
  computed: {
    isDisabled() {
      return this.$props.allCheckedItems.includes(this.$props.id);
    },
  },
  watch: {
    checkedArrayItems: function (v) {
      if (v.includes(this.$props.id)) {
        this.checkedCard = true;
      } else {
        this.checkedCard = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border: 1px solid rgb(107, 97, 97);
  border-radius: 3px;
  min-height: 400px;
  padding: 11px;

  &__btn {
    align-self: flex-end;
  }
}
</style>
