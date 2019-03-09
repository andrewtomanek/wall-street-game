<template>
  <div>
    <div class="dash__currency-display-box">
      <span class="dash__currency-display"
        >Vallet: {{ currencyVallet }} Credits</span
      >
    </div>
    <app-stock
      v-for="(stock, index) in stocks"
      :stock="stock"
      :key="index"
    ></app-stock>
  </div>
</template>

<script>
import Stock from "./Stock.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    appStock: Stock
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    },
    currencyVallet() {
      return this.$store.getters.getVallet;
    },
    ...mapGetters(["getVallet"])
  }
};
</script>
