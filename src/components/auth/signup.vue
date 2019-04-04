<template>
  <div class="signup__container">
    <form @submit.prevent="onSubmit">
      <div class="input" :class="{ invalid: $v.email.$error }">
        <label for="email">Mail</label>
        <input
          type="email"
          id="email"
          @blur="$v.email.$touch()"
          v-model="email"
        />
        <p v-if="!$v.email.email">Please provide a valid email address.</p>
        <p v-if="!$v.email.required">This field must not be empty.</p>
      </div>
      <div class="input" :class="{ invalid: $v.password.$error }">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          @blur="$v.password.$touch()"
          v-model="password"
        />
      </div>
      <div class="input" :class="{ invalid: $v.confirmPassword.$error }">
        <label for="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          @blur="$v.confirmPassword.$touch()"
          v-model="confirmPassword"
        />
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

.input.inline label {
  display: inline;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input.inline input {
  width: auto;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.input.invalid label {
  color: red;
}

.input.invalid input {
  border: 1px solid red;
  background-color: #ffc9aa;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.hobbies button {
  border: 1px solid #521751;
  background: #521751;
  color: white;
  padding: 6px;
  font: inherit;
  cursor: pointer;
}

.hobbies button:hover,
.hobbies button:active {
  background-color: #8d4288;
}

.hobbies input {
  width: 90%;
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
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>
