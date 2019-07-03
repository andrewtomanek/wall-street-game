<template>
  <header>
    <nav class="nav__box">
      <div v-if="auth" class="nav__panel">
        <router-link to="/" class="navbar-brand nav__link"
          >Dashboard</router-link
        >
        <router-link
          to="/portfolio"
          class="nav__link"
          activeClass="active"
          tag="a"
          >Portfolio</router-link
        >
        <router-link to="/stocks" class="nav__link" activeClass="active" tag="a"
          >Stocks</router-link
        >
        <router-link
          to="/currenciescart"
          class="nav__link"
          activeClass="active"
          tag="a"
          >Cart</router-link
        >
        <router-link
          to="/currencies"
          class="nav__link"
          activeClass="active"
          tag="a"
          >Currencies</router-link
        >
      </div>
      <div class="nav__links">
        <router-link v-if="!auth" to="/signup">Sign Up</router-link>
        <router-link v-if="!auth" to="/signin">Sign In</router-link>
        <button v-if="auth" class="data__button" @click="saveData">
          Save Data
        </button>
        <button v-if="auth" class="data__button" @click="loadData">
          Load Data
        </button>
        <span v-if="auth" class="dash__funds"
          >Funds: {{ funds.toFixed(2) }}$</span
        >
        <span class="dash__email" v-if="auth && email"> {{ email }}</span>
        <button v-if="auth" @click="onLogout" class="logout">Logout</button>
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

<style scoped>
header {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  background-color: hsla(0, 0%, 0%, 1);
  padding: 0 2rem;
  font-family: "Lato", sans-serif;
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
  color: whitesmoke;
}

.navbar-brand:hover {
  color: var(--red);
  background-color: white;
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
  padding: 0.5rem;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  place-items: center;
  justify-content: space-around;
  overflow: hidden;
}

.nav__link {
  color: whitesmoke;
  background-color: hsla(0, 0%, 0%, 1);
  border-bottom: 0.5rem solid transparent;
  padding: 0.5rem 0.3rem;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Tahoma";
  text-align: center;
  text-decoration: none;
  border-bottom: 0.3rem solid transparent;
}

.nav__link:hover {
  border-bottom: 0.3rem solid white;
}

.nav__link.router-link-exact-active {
  border-bottom: 0.3rem solid var(--green);
}

.nav__data {
  background-color: var(--red);
  color: whitesmoke;
  border-bottom: 0.5rem solid transparent;
  padding: 0.5rem 0.3rem;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Tahoma";
  text-align: center;
  text-decoration: none;
}

.nav__panel {
  color: whitesmoke;
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
  color: whitesmoke;
  padding: 0.5rem 0.3rem;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Tahoma";
  text-align: center;
  text-decoration: none;
}

.logout:hover {
  color: var(--red);
  background-color: white;
}

.data__button {
  border: 0.1rem solid hsla(22, 50%, 48%, 1);
  background-color: black;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.5rem 0.3rem;
  color: whitesmoke;
  cursor: pointer;
}

.data__button:hover {
  color: hsla(22, 50%, 48%, 1);
  background-color: white;
}

.dash__email {
  background-color: black;
  font-weight: 800;
  font-size: 1rem;
  padding: 0.5rem 0.3rem;
  color: whitesmoke;
}
.dash__funds {
  color: var(--green);
  font-weight: 900;
  font-size: 1rem;
  padding: 0.5rem 0.3rem;
}
</style>
