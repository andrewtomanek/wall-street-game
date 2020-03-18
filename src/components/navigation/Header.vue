<template>
  <header>
    <nav class="nav__box">
      <nav-panel></nav-panel>
      <auth-panel></auth-panel>
    </nav>
  </header>
</template>

<script>
import NavigationPanel from "./NavigationPanel.vue";
import AuthorizationPanel from "./AuthorizationPanel.vue";
import { mapActions } from "vuex";

export default {
  components: {
    navPanel: NavigationPanel,
    authPanel: AuthorizationPanel
  },
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

.nav__box {
  padding: 0rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  background-color: hsla(0, 0%, 0%, 1);
  padding: 0 1rem;
  width: 100vw;
}
</style>
