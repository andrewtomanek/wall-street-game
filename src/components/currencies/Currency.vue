<template>
  <div class="col-sm-6 col-md-4">
    <h3 class="panel-title">
      {{ currency.name }}
      <small>(Price: {{ currency.price }})</small>
    </h3>
    <div class="dash__currency-display-box">
      <button @click="purchaseForex()" class="select__button">
        Buy
      </button>
      <span class="dash__currency-display"
        >Bought Currency: {{ boughtQuantity }}</span
      >
      <input
        type="number"
        class="form-control"
        placeholder="Quantity"
        v-model.number="buyQuantity"
      />
    </div>
    <div class="dash__currency-display-box">
      <button @click="resellForex()" class="select__button">
        Sell
      </button>
      <span class="dash__currency-display"
        >Sold Currency: {{ soldQuantity }}</span
      >
      <input
        type="number"
        class="form-control"
        placeholder="Quantity"
        v-model.number="sellQuantity"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";

export default {
  props: ["currency"],
  data() {
    return {
      quantity: 0,
      currencyRate: null,
      purchase: null,
      resell: null,
      buyQuantity: null,
      sellQuantity: null,
      boughtQuantity: null,
      soldQuantity: null,
      from_currency: "USD",
      to_currency: "EUR"
    };
  },
  methods: {
    ...mapActions(["updateVallet"]),
    purchaseForex() {
      this.boughtQuantity = this.currencyRate * this.buyQuantity;
      this.purchase = this.$store.getters.getVallet - this.boughtQuantity;
      this.$store.dispatch("updateVallet", this.purchase);
    },
    resellForex() {
      this.soldQuantity = this.currencyRate * this.sellQuantity;
      this.resell = this.$store.getters.getVallet + this.soldQuantity;
      this.$store.dispatch("updateVallet", this.resell);
    }
  },
  created() {
    Vue.http
      .get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${
          this.from_currency
        }&to_currency=${this.to_currency}&apikey=KFUX4FTWY91NEYKL`
      )
      .then(data => {
        this.currencyRate =
          data.body["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
      });
  }
};
</script>

<style scoped>
.danger {
  border: 1px solid red;
}
</style>
