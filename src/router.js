import store from "./store/store";
import Portfolio from "./components/portfolio/Portfolio.vue";
import Stocks from "./components/stocks/Stocks.vue";
import CurrenciesCart from "./components/currencycart/CurrenciesCart.vue";
import Currencies from "./components/currencies/Currencies.vue";
import DashboardPage from "./components/dashboard/Dashboard.vue";
import SignupPage from "./components/auth/signup.vue";
import SigninPage from "./components/auth/signin.vue";

export const routes = [
  { path: "/", name: "dashboard", component: DashboardPage },
  {
    path: "/portfolio",
    component: Portfolio,
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next("/");
      }
    }
  },
  {
    path: "/stocks",
    component: Stocks,
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next("/");
      }
    }
  },
  {
    path: "/currenciescart",
    component: CurrenciesCart,
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next("/");
      }
    }
  },
  {
    path: "/currencies",
    component: Currencies,
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next("/");
      }
    }
  },
  { path: "/signup", component: SignupPage },
  { path: "/signin", component: SigninPage }
];
