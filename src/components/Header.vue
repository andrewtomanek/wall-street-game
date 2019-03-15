<template>
  <header>
    <nav class="nav__box">
      <div class="nav__links">
        <router-link to="/" class="navbar-brand">Dashboard</router-link>
        <router-link v-if="!auth" to="/signup">Sign Up</router-link>
        <router-link v-if="!auth" to="/signin">Sign In</router-link>
        <button v-if="auth" @click="onLogout" class="logout">Logout</button>
      </div>
      <div v-if="auth" class="nav__panel">
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
        <router-link
          to="/currenciescart"
          class="link__box"
          activeClass="active"
          tag="div"
          ><a class="nav__link">Cart</a></router-link
        >
        <router-link
          to="/currencies"
          class="link__box"
          activeClass="active"
          tag="div"
          ><a class="nav__link">Currencies</a></router-link
        >
      </div>
      <div v-if="auth" class="nav__panel">
        <button class="data__button" @click="saveData">Save Data</button>
        <button class="data__button" @click="loadData">Load Data</button>
        <span class="dash__email" v-if="email"> {{ email }}</span>
        <span class="dash__funds">Funds: {{ funds.toFixed(2) }}$</span>
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
    },
    email() {
      return !this.$store.getters.email ? false : this.$store.getters.email;
    }
  },
  methods: {
    ...mapActions(["uploadData", "downloadData", "logout"]),

    saveData() {
      const data = {
        user: this.$store.getters.email,
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
        currencies: this.$store.getters.getCurrencies
      };
      this.uploadData(data);
    },
    loadData() {
      this.downloadData();
    },
    onLogout() {
      this.logout();
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
  background-color: hsla(0, 0%, 0%, 1);
  border-bottom: 0.5rem solid transparent;
  padding: 0.5rem 0.3rem;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Tahoma";
  text-align: center;
  text-decoration: none;
}

.nav__link:hover {
  background-color: var(--grey);
  color: hsla(0, 0%, 0%, 1);
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

.logout {
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
.data__button {
  width: 100%;
  background-color: hsla(22, 50%, 48%, 1);
  font-size: 1rem;
  padding: 0.5rem;
  color: white;
}
.dash__email {
  width: 100%;
  background-color: hsla(22, 50%, 48%, 1);
  font-size: 1rem;
  padding: 0.5rem;
  color: white;
}
.dash__funds {
  width: 100%;
  background-color: hsla(22, 50%, 48%, 1);
  font-size: 1rem;
  padding: 0.5rem;
  color: white;
}
</style>
