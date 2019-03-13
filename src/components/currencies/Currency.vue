<template>
  <div class="currency__container">
    <div class="currency__display-box">
      <div class="currency__name">
        {{ currency.name }}
      </div>
      <div class="currency__rate">
        {{ currency.rate }}
      </div>
      <span class="currency__display"
        >Bought Currency: {{ currency.quantity }}</span
      >
      <input
        type="number"
        class="form__control"
        placeholder="Quantity"
        v-model.number="buyQuantity"
      />
      <button @click="purchaseForex()" class="select__button">
        Buy
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["currency"],
  data() {
    return {
      quantity: 0,
      currencyRate: null,
      buyQuantity: 0,
      from_currency: "USD",
      to_currency: "EUR"
    };
  },
  methods: {
    ...mapActions(["buyCurrency"]),
    purchaseForex() {
      const order = {
        currencyId: this.currency.id,
        currencyRate: this.currency.currencyRate,
        quantity: this.buyQuantity,
        oldQuantity: this.currency.quantity
      };
      this.$store.dispatch("buyCurrency", order);
      this.quantity = 0;
    }
  }
};
</script>

<style scoped>
.currency__display-box {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.8rem 0.5rem;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  align-content: space-around;
  background: hsla(179, 97%, 97%, 1);
}

.currency__display {
  width: 100%;
  color: hsla(22, 50%, 48%, 1);
  background-color: black;
  font-size: 1rem;
  padding: 0.5rem;
  color: white;
}

.currency__name {
  width: 100%;
  color: hsla(22, 50%, 48%, 1);
  background-color: black;
  font-size: 1rem;
  padding: 0.5rem;
  color: white;
}

.currency__rate {
  width: 100%;
  color: hsla(22, 50%, 48%, 1);
  background-color: black;
  font-size: 1rem;
  padding: 0.5rem;
  color: white;
}

.currency__controls {
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
  color: white;
  cursor: pointer;
}

.form__control {
  width: 100%;
  height: 100%;
  background-color: black;
  font-size: 1rem;
  padding: 0.3rem;
  color: white;
  cursor: pointer;
}

.select__button {
  background-color: var(--green);
  text-decoration: none;
  font-size: 1rem;
  padding: 0.3rem;
  border: 0.5rem ridge white;
  color: white;
  cursor: pointer;
}

.danger {
  border: 1px solid red;
}

.currency__container {
  margin: 0;
  padding: 0;
  display: grid;
  grid-auto-flow: row;
  place-items: center;
  justify-content: space-around;
  width: 100%;
  overflow: hidden;
}
</style>
