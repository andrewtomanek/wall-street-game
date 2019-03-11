<template>
  <div>
    <div class="dash__currency-display-box">
      <span class="dash__currency-display"
        >Vallet: {{ currencyVallet }} Credits</span
      >
    </div>
    <span class="dash__currency-display">Vallet: {{ currencies }} Credits</span>

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
    ...mapGetters(["getVallet", "getCurrenciesCart"]),
    currencies() {
      return this.$store.getters.getCurrenciesCart;
    },
    currencyVallet() {
      return this.$store.getters.getVallet;
    }
  }
};
</script>
