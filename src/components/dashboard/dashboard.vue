<template>
  <div class="dashboard">
    <data-page v-if="auth"></data-page>
    <select-currency></select-currency>
    <login-page v-if="!auth"></login-page>
  </div>
</template>

<script>
import LoginBoard from "./LoginBoard.vue";
import DataBoard from "./DataBoard.vue";
import CurrencySelect from './CurrencySelect.vue';
export default {
  components: {
    loginPage: LoginBoard,
    dataPage: DataBoard,
    selectCurrency: CurrencySelect
  },
  data() {
    return {
      forex: null,
      from_currency: "USD",
      to_currency: "EUR"
    };
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    getForex() {
      fetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${
          this.from_currency
        }&to_currency=${this.to_currency}&apikey=${
          process.env.VUE_APP_ALPHAVANTAGE_KEY
        }`
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.forex =
            data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
          return this.forex;
        });
    }
  }
};
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-gap: 0.1rem 0.5rem;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  align-content: space-around;
  width: 100vw;
  background: hsla(0, 0%, 95%, 1);
  color: hsla(0, 0%, 0%, 1);
}

.dash__currency-wrap {
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  align-content: space-around;
  background: hsla(179, 97%, 97%, 1);
  padding: 1.5rem 0.5rem 0rem;
}

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
  color: whitesmoke;
}

.dash__currency-controls {
  display: grid;
  grid-gap: 0.8rem 0.5rem;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  align-content: space-around;
  background-color: black;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 1rem;
  color: whitesmoke;
  cursor: pointer;
}
</style>
