<template>
  <div v-if="auth" class="nav__panel">
    <router-link to="/" class="navbar-brand nav__link">Dashboard</router-link>
    <router-link to="/portfolio" class="nav__link" activeClass="active" tag="a"
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
    <router-link to="/currencies" class="nav__link" activeClass="active" tag="a"
      >Currencies</router-link
    >
  </div>
</template>

<script>
export default {
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style>
.nav__panel {
  color: whitesmoke;
  padding: 0rem;
  grid-gap: 0 1rem;
  display: grid;
  grid-auto-flow: column;
  place-items: center;
  justify-content: space-around;
}

.navbar-brand {
  background-color: var(--red);
  color: whitesmoke;
}

.navbar-brand:hover {
  color: var(--red);
  background-color: white;
}

.nav__link {
  color: whitesmoke;
  background-color: hsla(0, 0%, 0%, 1);
  border-bottom: 0.5rem solid transparent;
  padding: 0.5rem 0.3rem;
  font-size: 1rem;
  font-weight: 600;
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
</style>
