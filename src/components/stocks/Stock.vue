<template>
  <div class="stock__row">
    <div class="stock__name">{{ stock.name }}</div>
    <div class="stock__symbol">
      {{ stock.symbol }}
    </div>
    <div class="stock__price">{{ stock.price.toFixed(2) }}</div>

    <div class="stock__quantity">{{ stock.quantity }}</div>
    <input
      type="number"
      class="stock__input"
      placeholder="Quantity"
      v-model.number="quantity"
      :class="{ danger: insufficientFunds }"
    />
    <button
      class="stock__button"
      @click="buyStock"
      :disabled="
        insufficientFunds || quantity <= 0 || !Number.isInteger(quantity)
      "
    >
      {{ insufficientFunds ? "Insufficient Funds" : "Buy" }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["stock"],
  data() {
    return {
      quantity: 0
    };
  },
  computed: {
    funds() {
      return this.$store.getters.funds;
    },
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    }
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      this.$store.dispatch("buyStock", order);
      this.quantity = 0;
    }
  }
};
</script>

<style scoped>
.stock__row {
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

.stock__name {
  width: 100%;
  background-color: black;
  font-size: 1rem;
  font-weight: 800;
  padding: 0.5rem;
  color: white;
}

.stock__symbol {
  width: 100%;
  background-color: black;
  font-size: 1rem;
  font-weight: 800;
  padding: 0.5rem;
  color: white;
}

.stock__price {
  width: 100%;
  background-color: black;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem;
  color: white;
}

.stock__quantity {
  width: 100%;
  color: white;
  font-weight: 700;

  font-size: 1rem;
  padding: 0.5rem;
}

.stock__input {
  width: 50%;
  background-color: black;
  font-size: 1rem;
  padding: 0.5rem;
  color: white;
  cursor: pointer;
}

.stock__button {
  background-color: var(--green);
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
