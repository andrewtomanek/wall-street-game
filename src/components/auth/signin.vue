<template>
  <div class="signin-container">
    <form class="signin__form" @submit.prevent="onSubmit">
      <div class="input__box">
        <label for="email">Login Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          @blur="$v.email.$touch()"
          v-model="email"
        />
        <p class="input__error" v-if="!$v.email.email">
          Please provide a valid email address.
        </p>
      </div>
      <div class="input__box">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          @blur="$v.password.$touch()"
          v-model="password"
        />
        <p class="input__error" v-if="!$v.password.minLen">
          Enter min 6 characters.
        </p>
      </div>
      <div class="submit">
        <button type="submit" :disabled="$v.$invalid">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLen: minLength(6)
    }
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
  align-items: center;
  height: 90vh;
  width: 100%;
}

.signin__form {
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  align-content: space-around;
  background-color: hsla(0, 0%, 95%, 1);
  padding: 0.1rem 2rem 0.5rem;
  border: 0.2rem solid white;
}

.input__box {
  margin: 0;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 0.3rem 0rem;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  align-content: space-around;
  padding: 1rem;
}

.input {
  margin: 10px auto;
}

.input__box label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--green);
}

.input__box input {
  font-size: 1.1rem;
  font-weight: 600;
  width: 100%;
  border: 0.2rem solid hsla(0, 0%, 70%, 1);
  background-color: hsla(0, 0%, 95%, 1);
}

.input__box input:focus {
  border: 0.2rem solid hsla(0, 0%, 90%, 1);
  outline: none;
  background-color: white;
}

.input__error {
  color: var(--red);
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0;
}

.submit button {
  background-color: var(--green);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.3rem;
  border: 0.2rem solid white;
  color: white;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  color: var(--green);
  background-color: white;
  border: 0.2rem solid var(--green);
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
