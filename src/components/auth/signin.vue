<template>
  <div class="signin-container">
    <form @submit.prevent="onSubmit">
      <div class="input">
        <label for="email">Mail</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="submit">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", {
        email: formData.email,
        password: formData.password
      });
    }
  }
};
</script>

<style scoped>
.signin-container {
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

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid red;
  background-color: transparent;
  color: red;
  cursor: not-allowed;
}
</style>
