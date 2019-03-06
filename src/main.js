import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import VueResource from "vue-resource";

import { routes } from "./router";
import store from "./store/store";

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(VueResource);

Vue.http.options.root = "https://valid-trader.firebaseio.com/";

Vue.filter("currency", value => {
  return "$" + value.toLocaleString();
});

axios.defaults.baseURL = "https://valid-trader.firebaseio.com/";
// axios.defaults.headers.common['Authorization'] = 'fasfdsa'
axios.defaults.headers.get["Accepts"] = "application/json";

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log("Request Interceptor", config);
  return config;
});
const resInterceptor = axios.interceptors.response.use(res => {
  console.log("Response Interceptor", res);
  return res;
});

axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);

const router = new VueRouter({
  mode: "history",
  routes
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

export default router;
