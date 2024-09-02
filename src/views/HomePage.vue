<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCurrencyStore } from "../stores/currency";

const currencyStore = useCurrencyStore();

onMounted(() => {
   currencyStore.fetchRates();
});

const baseCurrency = computed(() => currencyStore.baseCurrency);
const rates = computed(() => {
   return {
      USD: currencyStore.getRate(`${baseCurrency.value.toLowerCase()}-usd`),
      EUR: currencyStore.getRate(`${baseCurrency.value.toLowerCase()}-eur`),
      RUB: currencyStore.getRate(`${baseCurrency.value.toLowerCase()}-rub`),
   };
});
</script>

<template>
   <div class="home">
      <div class="container">
         <h1 v-if="!useCurrencyStore().isLoading">курс {{ baseCurrency }}</h1>
         <div v-if="useCurrencyStore().isLoading">загрузка...</div>
         <div v-else-if="useCurrencyStore().error">ошибка :(</div>
         <ul v-else>
            <li
               v-for="[currency, rate] in Object.entries(rates).filter(
                  ([_, rate]) => rate !== undefined && rate !== null
               )"
               :key="currency"
            >
               <div>
                  1 <span>{{ baseCurrency.toUpperCase() }}</span>
               </div>
               <div>
                  {{ rate }} <span>{{ currency.toUpperCase() }}</span>
               </div>
            </li>
         </ul>
      </div>
   </div>
</template>

<style scoped lang="scss">
@use "../assets/main.scss" as *;

.home {
   display: flex;
   justify-content: center;
   align-items: center;
   height: calc(100vh - 3vw);

   .container {
      div {
         color: $black;
         font-size: 1.2vw;
         text-transform: uppercase;
         font-weight: 700;
         text-align: center;
      }
      ul {
         width: 100%;
         display: flex;
         flex-direction: column;
         gap: 1.5vw;

         li {
            background: $white;
            color: $black;
            font-size: 1.2vw;
            padding: 1vw;
            border-radius: 1vw;
            display: flex;
            justify-content: space-between;
            align-items: center;
            div {
               font-weight: 400;
            }
            span:nth-child(1) {
               font-weight: 700;
            }
         }
      }
   }
}

@media (width < 768px) {
   .home {
      height: calc(100vh - 10vw);

      .container {
         div {
            font-size: 4vw;
         }
         ul {
            gap: 4vw;
            li {
               font-size: 4vw;
               padding: 4vw;
               border-radius: 3vw;
            }
         }
      }
   }
}
</style>
