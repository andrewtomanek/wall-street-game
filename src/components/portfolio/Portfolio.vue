<template>
  <div class="stock__container">
    <div class="stock__labels">
      <span class="stock__label">
        Name
      </span>
      <span class="stock__label">
        Symbol
      </span>
      <span class="stock__label">
        Rate
      </span>
      <span class="stock__label">Quantity </span>
      <span class="stock__label-empty"></span>
    </div>
    <app-stock
      v-for="stock in stocks"
      :stock="stock"
      :key="stock.id"
    ></app-stock>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Stock from "./Stock.vue";

export default {
  computed: {
    ...mapGetters({
      stocks: "stockPortfolio"
    })
  },
  components: {
    appStock: Stock
  }
};
</script>

<style scoped>
.stock__container {
  display: grid;
  grid-auto-flow: row;
  grid-gap: 1.5rem 0.5rem;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  align-content: space-around;
  padding: 1rem;
  width: 100vw;
  background: hsla(0, 0%, 95%, 1);
}

.stock__labels {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1.5rem 0.5rem;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  align-content: space-around;
  width: 90vw;
  padding: 1rem;
  background: hsla(0, 0%, 0%, 1);
}

.stock__label {
  padding: 0.3rem;
  background: hsla(0, 0%, 95%, 1);
}

.stock__label-empty {
  padding: 1rem;
  width: 25vw;
}
</style>
