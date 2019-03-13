import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios-auth";
import globalAxios from "axios";
import router from "../main";
import stocks from "./modules/stocks";
import portfolio from "./modules/portfolio";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stocks,
    portfolio
  },
  state: {
    currencies: [],
    vallet: 10000,
    idToken: null,
    userId: null,
    user: null,
    email: null
  },
  mutations: {
    buyCurrency(state, { currencyId, quantity, oldQuantity }) {
      // const record = state.currencies.find(element => element.id == currencyId);
      // if (record) {
      //   record.quantity += quantity;
      // } else {
      //   state.currencies.push({
      //     id: currencyId,
      //     quantity: quantity
      //   });
      // }
      let tempVallet = state.vallet;
      for (let item of state.currencies) {
        if (currencyId === item.id) {
          tempVallet -= item.rate * quantity;
          if (tempVallet > 0) {
            item.quantity += quantity;
            state.vallet = tempVallet;
          } else {
            item.quantity = oldQuantity;
          }
        }
        console.log(state.vallet, item.rate, item.quantity);
      }
    },
    sellCurrency(state, { currencyId, quantity }) {
      const record = state.currencies.find(element => element.id == currencyId);
      if (record.quantity > quantity) {
        record.quantity -= quantity;
      } else {
        state.currencies.splice(state.currencies.indexOf(record), 1);
      }
      let tempVallet = 0;
      for (let item of state.currencies) {
        tempVallet += item.rate * item.quantity;
        console.log(state.vallet, item.rate, item.quantity);
      }
      state.vallet += tempVallet;
    },
    setCurrencies(state, currencies) {
      state.currencies = currencies;
    },
    storeVallet(state, vallet) {
      state.vallet = vallet;
    },
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    storeUser(state, user) {
      state.user = user;
    },
    storeEmail(state, email) {
      state.email = email;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    buyCurrency: ({ commit }, order) => {
      commit("buyCurrency", order);
    },
    sellCurrency({ commit }, order) {
      commit("sellCurrency", order);
    },
    initCurrencies: ({ commit }) => {
      let currencies = [
        { id: 1, name: "EUR", rate: 0.8855, quantity: 0, oldQuantity: 0 },
        { id: 2, name: "CNY", rate: 6.7085, quantity: 0, oldQuantity: 0 },
        { id: 3, name: "GBP", rate: 0.76475, quantity: 0, oldQuantity: 0 },
        { id: 4, name: "CZK", rate: 22.724, quantity: 0, oldQuantity: 0 }
      ];

      for (let item of currencies) {
        Vue.http
          .get(
            `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=${
              item.name
            }&apikey=KFUX4FTWY91NEYKL`
          )
          .then(data => {
            let rateData =
              data.body["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
            console.log(rateData);
            if (rateData) {
              item.rate = +rateData;
            }
          });
      }
      commit("setCurrencies", currencies);
    },
    updateVallet({ commit }, vallet) {
      commit("storeVallet", vallet);
    },
    loadData({ commit, state }) {
      Vue.http
        .get("data.json" + "?auth=" + state.idToken)
        .then(response => response.json())
        .then(data => {
          if (data) {
            const stocks = data.stocks;
            const funds = data.funds;
            const stockPortfolio = data.stockPortfolio;

            const portfolio = {
              stockPortfolio,
              funds
            };

            commit("SET_STOCKS", stocks);
            commit("SET_PORTFOLIO", portfolio);
          }
        });
    },
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit("clearAuthData");
      }, expirationTime * 1000);
    },
    signup({ commit, dispatch }, authData) {
      axios
        .post("/signupNewUser?key=AIzaSyB_dlI7vt_NSbRrpfbqnDai4Ljz-LI4KYk", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );
          localStorage.setItem("email", authData.email);
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch("storeUser", authData);
          dispatch("setLogoutTimer", res.data.expiresIn);
          router.push({ name: "dashboard" });
        })
        .catch(error => console.log(error));
    },
    login({ commit, dispatch }, authData) {
      axios
        .post("/verifyPassword?key=AIzaSyB_dlI7vt_NSbRrpfbqnDai4Ljz-LI4KYk", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );
          localStorage.setItem("email", authData.email);
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });
          dispatch("setLogoutTimer", res.data.expiresIn);
          router.push({ name: "dashboard" });
        })
        .catch(error => console.log(error));
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const expirationDate = localStorage.getItem("expirationDate");
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }
      const userId = localStorage.getItem("userId");
      commit("authUser", {
        token: token,
        userId: userId
      });
    },
    logout({ commit }) {
      commit("clearAuthData");
      localStorage.removeItem("email");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.replace("/signin");
    },
    storeUser({ state }, userData) {
      if (!state.idToken) {
        return;
      }
      globalAxios
        .post("/users.json" + "?auth=" + state.idToken, userData)
        .catch(error => console.log(error));
    },
    fetchUser({ commit, state }) {
      let userEmail = localStorage.getItem("email");
      if (!state.idToken) {
        return;
      }
      globalAxios
        .get("/users.json" + "?auth=" + state.idToken)
        .then(res => {
          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }
          let userArr = users.find(user => user.email == userEmail);
          commit("storeUser", userArr[0]);
          commit("storeEmail", userEmail);
        })
        .catch(error => console.log(error));
    }
  },
  getters: {
    getCurrencies(state) {
      return state.currencies;
    },
    getVallet(state) {
      return state.vallet;
    },
    user(state) {
      return state.user;
    },
    email(state) {
      return state.email;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    },
    getCurrenciesCart(state, getters) {
      return state.currencies.map(currency => {
        const record = getters.getCurrencies.find(
          element => element.id == currency.id
        );
        return {
          id: currency.id,
          quantity: currency.quantity,
          name: record.name,
          rate: record.rate
        };
      });
    }
  }
});
