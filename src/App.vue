<template>
  <div class="trader__container">
    <app-header></app-header>
    <div class="trader__box">
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: {
    appHeader: Header
  },
  created() {
    this.$store.dispatch("initStocks");
    this.$store.dispatch("initCurrencies");
    this.$store.dispatch("tryAutoLogin");
    this.$store.dispatch("downloadData");
  }
};
</script>

<style>
:root {
  --green: hsla(136, 70%, 50%, 1);
  --red: hsla(359, 70%, 50%, 1);
  --grey: hsla(0, 25%, 95%, 1);

  font-size: calc(1vw + 1vh + 0.5vmin);
}

body {
  margin: 0;
  padding: 0;
  background-color: hsla(0, 0%, 90%, 1);
  font-family: "Nunito Sans", sans-serif;
}

button {
  font-family: "Lato", sans-serif;
}

.trader__container {
  margin: 0;
  padding: 0;
  display: grid;
  grid-auto-flow: row;
  place-items: center;
  justify-content: space-around;
  width: 100%;
  overflow: hidden;
}

.trader__box {
  margin: 0;
  padding: 0;
  display: grid;
  grid-auto-flow: row;
  place-items: center;
  justify-content: space-around;
  width: 100%;
  overflow: hidden;
}

.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
