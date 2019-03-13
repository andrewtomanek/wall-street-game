<template>
  <div>
    <app-currency
      v-for="currency in currencies"
      :currency="currency"
      :key="currency.id"
    ></app-currency>
  </div>
</template>

<script>
import CurrencyCart from "./CurrencyCart.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    appCurrency: CurrencyCart
  },
  computed: {
    ...mapGetters(["getCurrenciesCart"]),
    currencies() {
      return this.$store.getters.getCurrenciesCart;
    }
  }
};
</script>
