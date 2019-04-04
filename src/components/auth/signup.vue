<template>
  <div class="signup__container">
    <form class="signup__form" @submit.prevent="onSubmit">
      <div class="input__box" :class="{ invalid: $v.email.$error }">
        <label for="email">Mail</label>
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
      <div class="input__box" :class="{ invalid: $v.password.$error }">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Please enter password"
          @blur="$v.password.$touch()"
          v-model="password"
        />
        <p class="input__error" v-if="!$v.password.minLen">
          Enter min 6 characters.
        </p>
      </div>
      <div class="input__box" :class="{ invalid: $v.confirmPassword.$error }">
        <label for="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="Please confirm password"
          @blur="$v.confirmPassword.$touch()"
          v-model="confirmPassword"
        />
        <p class="input__error" v-if="!$v.confirmPassword.sameAs">
          Enter identical password.
        </p>
      </div>
      <div class="submit">
        <button type="submit" :disabled="$v.$invalid">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  validations: {
    email: {
      required,
      email,
      unique: val => {
        if (val === "") return true;
        return axios
          .get('/users.json?orderBy="email"&equalTo="' + val + '"')
          .then(res => {
            return Object.keys(res.data).length === 0;
          });
      }
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs(vm => {
        return vm.password;
      })
    }
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
      this.$store.dispatch("signup", formData);
    }
  }
};
</script>

<style scoped>
.signup__container {
  display: grid;
  align-items: center;
  height: 90vh;
  width: 100%;
}

.signup__form {
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

.input__box label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--green);
}

.input__box input {
  font-size: 1.1rem;
  font-weight: 600;
  width: 100%;
  border: 0.2rem solid white;
}

.input__box input:focus {
  border: 0.2rem solid var(--green);
  outline: none;
  background-color: #eee;
}

.input__box.invalid label {
  color: red;
}

.input__box.invalid input {
  border: 0.2rem solid red;
  background-color: #ffc9aa;
}

.input__box select {
  border: 0.2rem solid #ccc;
  font: inherit;
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
  border: 0.2rem solid var(--grey);
  background-color: white;
  color: var(--grey);
  cursor: not-allowed;
}
</style>
