<template>
  <header>
    <nav class="nav__box">
      <div class="nav__links">
        <router-link to="/" class="navbar-brand">Stock Trader</router-link>
        <router-link
          to="/portfolio"
          class="link__box"
          activeClass="active"
          tag="div"
          ><a class="nav__link">Portfolio</a></router-link
        >
        <router-link
          to="/stocks"
          class="link__box"
          activeClass="active"
          tag="div"
          ><a class="nav__link">Stocks</a></router-link
        >
        <router-link v-if="!auth" to="/signup">Sign Up</router-link>
        <router-link v-if="!auth" to="/signin">Sign In</router-link>
        <button v-if="auth" @click="onLogout" class="logout">Logout</button>
      </div>
      <div v-if="auth" class="nav__panel">
        <ul class="nav__menu">
          <li class="nav__menu-item">
            <router-link to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav__menu-item">
            <a class="nav__link" href="#" @click="endDay">End Day</a>
          </li>
          <li class="nav__menu-item">
            <a class="nav__link" href="#" @click="saveData">Save Data</a>
          </li>
          <li class="nav__menu-item">
            <a class="nav__link" href="#" @click="loadData">Load Data</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isDropdownOpen: true
    };
  },
  computed: {
    funds() {
      return this.$store.getters.funds;
    },
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    ...mapActions({
      randomizeStocks: "randomizeStocks",
      fetchData: "loadData"
    }),
    endDay() {
      this.randomizeStocks();
    },
    saveData() {
      const data = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks
      };
      this.$http.put("data.json" + "?auth=" + this.$store.state.idToken, data);
    },
    loadData() {
      this.fetchData();
    },
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
#header {
  height: 56px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  background-color: #521751;
  padding: 0 20px;
}

.logo {
  font-weight: bold;
  color: white;
}

.logo a {
  text-decoration: none;
  color: white;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
}

li {
  margin: 0 16px;
}

li a {
  text-decoration: none;
  color: white;
}

li a:hover,
li a:active,
li a.router-link-active {
  color: #fa923f;
}

.logout {
  background-color: transparent;
  border: none;
  font: inherit;
  color: white;
  cursor: pointer;
}

nav {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  background-color: hsla(0, 0%, 0%, 1);
  padding: 0 2rem;
}

nav a {
  background-color: var(--red);
  color: white;
  border-bottom: 0.5rem solid transparent;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Tahoma";
  text-align: center;
  text-decoration: none;
}

.nav a:hover {
  background-color: var(--red);
  color: white;
  border-bottom: 0.5rem solid white;
}

nav a.router-link-exact-active {
  border-bottom: 0.5rem solid var(--red);
}

.nav__header {
  margin: 0;
  padding: 0;
  display: grid;
  grid-auto-flow: row;
  place-items: center;
  justify-content: space-around;
  width: 100%;
  overflow: hidden;
}

.navbar-brand {
  background-color: var(--red);
  color: white;
  border-bottom: 0.5rem solid transparent;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Tahoma";
  text-align: center;
  text-decoration: none;
}

.nav__box {
  padding: 0rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  background-color: hsla(0, 0%, 0%, 1);
  padding: 0 1rem;
  width: 100vw;
}

.nav__links {
  color: white;
  padding: 0.5rem;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  place-items: center;
  justify-content: space-around;
  overflow: hidden;
}

.nav__link {
  background-color: var(--red);
  color: white;
  border-bottom: 0.5rem solid transparent;
  padding: 0.5rem 0.3rem;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Tahoma";
  text-align: center;
  text-decoration: none;
}

.nav__link:hover {
  background-color: var(--red);
  color: white;
  border-bottom: 0.3rem solid white;
}

.link__box {
  border-bottom: 0.3rem solid transparent;
}

.nav__data {
  background-color: var(--red);
  color: white;
  border-bottom: 0.5rem solid transparent;
  padding: 0.5rem 0.3rem;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Tahoma";
  text-align: center;
  text-decoration: none;
}

.nav__panel {
  color: white;
  padding: 0rem;
  grid-gap: 0 1rem;
  display: grid;
  grid-auto-flow: column;
  place-items: center;
  justify-content: space-around;
}

.nav__menu {
  margin: 0;
  padding: 0.5rem;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  place-items: center;
  justify-content: space-around;
  width: 100%;
  list-style: none;
}

.nav__menu-item {
  border-bottom: 0.5rem solid transparent;
}
</style>
