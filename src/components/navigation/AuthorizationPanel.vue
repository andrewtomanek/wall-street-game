<template>
  <div class="nav__links">
    <router-link v-if="!auth" to="/signup" class="router__link"
      >Sign Up</router-link
    >
    <router-link v-if="!auth" to="/signin" class="router__link">
      Sign In</router-link
    >
    <button v-if="auth" class="data__button" @click="saveData">
      Save Data
    </button>
    <button v-if="auth" class="data__button" @click="loadData">
      Load Data
    </button>
    <span v-if="auth" class="dash__funds">Funds: {{ funds.toFixed(2) }}$</span>
    <span class="dash__email" v-if="auth && email"> {{ email }}</span>
    <button v-if="auth" @click="onLogout" class="logout">Logout</button>
  </div>
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
.nav__links {
  padding: 0.5rem;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  place-items: center;
  justify-content: space-around;
  overflow: hidden;
}

.nav__data {
  background-color: var(--red);
  color: whitesmoke;
  border-bottom: 0.5rem solid transparent;
  padding: 0.5rem 0.3rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: "Tahoma";
  text-align: center;
  text-decoration: none;
}

.logout {
  border: 0.1rem solid var(--red);
  background-color: black;
  color: var(--red);
  padding: 0.5rem 0.3rem;
  font-size: 1rem;
  font-weight: 600;
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
  font-weight: 500;
  padding: 0.5rem 0.3rem;
  color: hsla(22, 50%, 48%, 1);
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

.router__link {
  text-decoration: none;
  background-color: var(--green);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.5rem;
  border: 0.4rem solid black;
  color: whitesmoke;
  cursor: pointer;
}

.router__link:hover,
.router__link:active {
  color: var(--green);
  background-color: white;
  border: 0.4rem solid var(--green);
}
</style>
