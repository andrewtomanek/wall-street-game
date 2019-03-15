<template>
  <div class="dashboard__container">
    <H2>Purchased stock </H2>

    <div
      class="dashboard__display-box"
      v-for="stockItem in stocks"
      :key="stockItem.symbol"
    >
      <div class="dashboard__name">
        {{ stockItem.name }}
      </div>
      <div class="dashboard__rate">
        {{ stockItem.symbol }}
      </div>
      <div class="dashboard__rate">{{ stockItem.price }}</div>
      <div class="dashboard__rate">{{ stockItem.quantity }}</div>
    </div>
    <H2>Purchased currency </H2>
    <div
      v-for="money in currencies"
      :key="money.symbol"
      class="dashboard__display-box"
    >
      <div class="dashboard__name">
        {{ money.name }}
      </div>
      <div class="dashboard__rate">
        {{ money.symbol }}
      </div>
      <div class="dashboard__rate">
        {{ money.rate }}
      </div>
      <span class="dashboard__display"> {{ money.quantity }}</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    },
    currencies() {
      return this.$store.getters.getCurrenciesCart;
    }
  }
};
</script>

<style scoped>
.dashboard__container {
  margin: 0;
  padding: 0;
  display: grid;
  grid-gap: 0.8rem 0.5rem;
  grid-auto-flow: row;
  place-items: center;
  justify-content: space-around;
  width: 100%;
  font-weight: 700;
  overflow: hidden;
}

.dashboard__display-box {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.8rem 0.5rem;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  align-content: space-around;
  background-color: black;
  width: 90vw;
  border: 0.5rem double black;
}

.dashboard__display {
  width: 100%;
  color: hsla(22, 50%, 48%, 1);
  background-color: black;
  font-size: 1rem;
  padding: 0.5rem;
  color: white;
}

.dashboard__name {
  width: 25vw;
  color: white;
  font-size: 1rem;
  padding: 0.5rem;
}

.dashboard__rate {
  width: 100%;
  color: white;
  font-size: 1rem;
  padding: 0.5rem;
}
</style>
