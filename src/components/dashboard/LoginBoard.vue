<template>
  <div class="home">
    <h1>Wall Street Game</h1>
    <p>Sign in or sign up to save your data</p>
    <div class="router__box">
      <router-link class="router__link" to="/signup">Sign Up</router-link>
      <router-link class="router__link" to="/signin">Sign In</router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100vw;
  height: 60vh;
  margin: 0;
}

h1 {
  text-align: center;
}

p {
  text-align: center;
}

.router__box {
  display: grid;
  grid-gap: 1rem;
  grid-auto-flow: column;
  justify-content: center;
  background-color: hsla(0, 0%, 95%, 1);
  padding: 1rem 2rem;
}

.router__link {
  text-decoration: none;
  background-color: var(--green);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.5rem;
  border: 0.4rem solid black;
  color: white;
  cursor: pointer;
}

.router__link:hover,
.router__link:active {
  color: var(--green);
  background-color: white;
  border: 0.4rem solid var(--green);
}
</style>
