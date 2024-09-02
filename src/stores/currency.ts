import { defineStore } from "pinia";
import axios from "axios";

interface CurrencyRates {
   [key: string]: number;
}

interface State {
   baseCurrency: string;
   fromCurrency: string;
   toCurrency: string;
   currencyRates: CurrencyRates;
   currencies: string[];
   isLoading: boolean;
   error: string | null;
}

export const useCurrencyStore = defineStore("currency", {
   state: (): State => ({
      currencies: ["USD", "EUR", "RUB"],
      currencyRates: {},
      baseCurrency: "RUB",
      fromCurrency: "RUB",
      toCurrency: "USD",
      isLoading: false,
      error: null,
   }),

   actions: {
      async fetchRates() {
         this.isLoading = true;
         this.error = null;
         try {
            const response = await axios.get(
               "https://status.neuralgeneration.com/api/currency"
            );
            this.currencyRates = response.data;
            Object.keys(this.currencyRates).forEach((currency) => {
               this.currencyRates[currency] = Number(
                  this.currencyRates[currency].toFixed(2)
               );
            });
         } catch (error: any) {
            this.error = error.message;
         } finally {
            this.isLoading = false;
         }
      },

      setBaseCurrency(currency: string) {
         this.baseCurrency = currency;
      },
   },

   getters: {
      getRate: (state: State) => {
         return (key: string) => {
            console.log(key);
            const rate = state.currencyRates[key];
            return rate || null;
         };
      },
   },
});
