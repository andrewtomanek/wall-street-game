import store from "./store/store";
import Portfolio from "./components/portfolio/Portfolio.vue";
import Stocks from "./components/stocks/Stocks.vue";
import CurrenciesCart from "./components/currencycart/CurrenciesCart.vue";
import Currencies from "./components/currencies/Currencies.vue";
import WelcomePage from "./components/welcome/welcome.vue";
import DashboardPage from "./components/dashboard/dashboard.vue";
import SignupPage from "./components/auth/signup.vue";
import SigninPage from "./components/auth/signin.vue";

export const routes = [
  { path: "/", component: WelcomePage },
  { path: "/portfolio", component: Portfolio },
  { path: "/stocks", component: Stocks },
  { path: "/currenciescart", component: CurrenciesCart },
  { path: "/currencies", component: Currencies },
  { path: "/signup", component: SignupPage },
  { path: "/signin", component: SigninPage },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next("/signin");
      }
    }
  }
];
