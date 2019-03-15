<template>
  <div class="currency__container">
    <div class="currency__name">
      {{ currency.name }}
    </div>
    <div class="currency__symbol">
      {{ currency.symbol }}
    </div>
    <div class="currency__rate">
      {{ currency.rate.toFixed(2) }}
    </div>
    <span class="currency__quantity"> {{ currency.quantity }}</span>
    <input
      type="number"
      class="currency__input"
      placeholder="Quantity"
      min="0"
      v-model.number="sellQuantity"
      :class="{ invalid: this.sellQuantity < 0 }"
    />
    <button @click="resellForex()" class="currency__button">
      Sell
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["currency"],
  data() {
    return {
      quantity: 0,
      sellQuantity: 0
    };
  },
  methods: {
    ...mapActions(["sellCurrency"]),
    resellForex() {
      if (this.sellQuantity < 0) return;
      const order = {
        currencyId: this.currency.id,
        currencyRate: this.currency.rate,
        quantity: this.sellQuantity,
        oldQuantity: this.currency.quantity
      };
      this.sellCurrency(order);
      this.sellQuantity = 0;
    }
  }
};
</script>

<style scoped>
.currency__container {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.5rem;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  align-content: space-around;
  width: 90vw;
  padding: 1rem;
  background: hsla(0, 0%, 0%, 1);
}

.currency__name {
  width: 100%;
  background-color: black;
  font-size: 1rem;
  font-weight: 800;
  padding: 0.5rem;
  color: white;
  width: 25vw;
}

.currency__symbol {
  width: 100%;
  background-color: black;
  font-size: 1rem;
  font-weight: 800;
  padding: 0.5rem;
  color: white;
}

.currency__price {
  width: 100%;
  background-color: black;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem;
  color: white;
}

.currency__rate {
  width: 100%;
  background-color: black;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem;
  color: white;
}

.currency__quantity {
  width: 100%;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.5rem;
}

.currency__input {
  width: 50%;
  background-color: black;
  font-size: 1rem;
  padding: 0.5rem;
  color: white;
  cursor: pointer;
}

.currency__button {
  background-color: var(--red);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 900;
  padding: 0.5rem;
  color: white;
  border: 0.3rem solid var(--grey);
  cursor: pointer;
}
.danger {
  border: 1px solid red;
}
</style>
