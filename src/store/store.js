import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios-auth";
import globalAxios from "axios";
import router from "../main";
import stocks from "../data/stocks";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    funds: 10000,
    stocks: [],
    currencies: [],
    vallet: 10000,
    idToken: null,
    userId: null,
    user: null,
    email: null
  },
  mutations: {
    buyStock(state, { stockId, quantity, stockPrice }) {
      const record = state.stocks.find(element => element.id == stockId);
      if (record) {
        record.quantity += quantity;
      } else {
        state.stocks.push({
          id: stockId,
          quantity: quantity
        });
      }
      state.funds -= stockPrice * quantity;
    },
    sellStock(state, { stockId, quantity, stockPrice }) {
      const record = state.stocks.find(element => element.id == stockId);
      if (record.quantity > quantity) {
        record.quantity -= quantity;
      } else {
        record.quantity = 0;
      }
      state.funds += stockPrice * quantity;
    },
    setPortfolio(state, portfolio) {
      state.funds = portfolio.funds;
      state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
    },
    setStocks(state, stocks) {
      state.stocks = stocks;
    },
    randomizeStocks(state) {
      state.stocks.forEach(stock => {
        stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
      });
    },
    buyCurrency(state, { currencyId, quantity, oldQuantity }) {
      let buyVallet = state.funds;
      for (let item of state.currencies) {
        if (currencyId === item.id) {
          buyVallet -= item.rate * quantity;
          if (buyVallet > 0) {
            item.quantity += quantity;
            state.funds = buyVallet;
          } else {
            item.quantity = oldQuantity;
          }
        }
      }
    },
    sellCurrency(state, { currencyId, quantity, oldQuantity }) {
      let sellVallet = state.funds;
      for (let item of state.currencies) {
        if (currencyId === item.id) {
          if (item.quantity >= quantity) {
            sellVallet += item.rate * quantity;
            item.quantity -= quantity;
            state.funds = sellVallet;
          } else {
            item.quantity = oldQuantity;
          }
        }
      }
    },
    setCurrencies(state, currencies) {
      state.currencies = currencies;
    },
    storeVallet(state, vallet) {
      state.funds = vallet;
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
    sellStock({ commit }, order) {
      commit("sellStock", order);
    },
    buyStock: ({ commit }, order) => {
      commit("buyStock", order);
    },
    initStocks: ({ commit }) => {
      commit("setStocks", stocks);
    },
    randomizeStocks: ({ commit }) => {
      commit("randomizeStocks");
    },
    buyCurrency: ({ commit }, order) => {
      commit("buyCurrency", order);
    },
    sellCurrency({ commit }, order) {
      commit("sellCurrency", order);
    },
    initCurrencies: ({ commit }) => {
      let currencies = [
        {
          id: 1,
          name: "Euro",
          symbol: "EUR",
          rate: 0.8855,
          quantity: 0,
          oldQuantity: 0
        },
        {
          id: 2,
          name: "Chinese Yuan",
          symbol: "CNY",
          rate: 6.7085,
          quantity: 0,
          oldQuantity: 0
        },
        {
          id: 3,
          name: "British Pound Sterling",
          symbol: "GBP",
          rate: 0.76475,
          quantity: 0,
          oldQuantity: 0
        },
        {
          id: 4,
          name: "Czech Republic Koruna",
          symbol: "CZK",
          rate: 22.724,
          quantity: 0,
          oldQuantity: 0
        }
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

            commit("setStocks", stocks);
            commit("setPortfolio", portfolio);
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
    stockPortfolio(state, getters) {
      return state.stocks.map(stock => {
        const record = getters.stocks.find(element => element.id == stock.id);
        return {
          id: stock.id,
          quantity: stock.quantity,
          name: record.name,
          price: record.price
        };
      });
    },
    stocks: state => {
      return state.stocks;
    },
    getCurrencies(state) {
      return state.currencies;
    },
    funds(state) {
      return state.funds;
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
          symbol: currency.symbol,
          name: record.name,
          rate: record.rate
        };
      });
    }
  }
});
