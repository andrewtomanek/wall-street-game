<template>
  <div>
    <div class="currency__display-box">
      <div class="currency__name">
        name
      </div>
      <div class="currency__display">
        rate
      </div>
      <div class="currency__display">
        amount
      </div>
      <span class="currency__display">quantity </span>
      <span class="currency__display">Choose </span>
      <span class="currency__display">Buy </span>
    </div>
    <app-currency
      v-for="currency in currencies"
      :currency="currency"
      :key="currency.id"
    ></app-currency>
  </div>
</template>

<script>
import Currency from "./Currency.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    appCurrency: Currency
  },
  computed: {
    ...mapGetters(["getCurrencies"]),
    currencies() {
      return this.$store.getters.getCurrencies;
    }
  }
};
</script>

<style scoped>
.dash__currency-display-box {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.8rem 0.5rem;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  align-content: space-around;
  background: hsla(179, 97%, 97%, 1);
}

.dash__currency-display {
  width: 100%;
  color: hsla(22, 50%, 48%, 1);
  background-color: black;
  font-size: 1rem;
  padding: 0.5rem;
  color: white;
}

.currency__display-box {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.8rem 0.5rem;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  align-content: space-around;
  background-color: var(--grey);
}

.currency__display {
  width: 100%;
  background-color: black;
  font-size: 1rem;
  padding: 0.5rem;
  color: white;
}
</style>
