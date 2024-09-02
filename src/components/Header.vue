<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import Dropdown from "./Dropdown.vue";
import { useCurrencyStore } from "../stores/currency";

const currencyStore = useCurrencyStore();
const headerDropdownIsOpen = ref(false);
const baseCurrency = ref(currencyStore.baseCurrency);
function handleDropdownClick(currency: string) {
   baseCurrency.value = currency;
   headerDropdownIsOpen.value = false;
}

watch(baseCurrency, currencyStore.setBaseCurrency);
</script>

<template>
   <header>
      <div class="menu">
         <RouterLink exact-active-class="active" to="/">главная</RouterLink>
         <RouterLink active-class="active" to="/convert"
            >конвертация</RouterLink
         >
      </div>
      <div class="currency_choice">
         <Dropdown
            :handleDropdownClick="handleDropdownClick"
            :currency="baseCurrency"
         />
      </div>
   </header>
</template>

<style scoped lang="scss">
@use "./../assets/main.scss" as *;
* {
   color: $white;
   font-size: 1vw;
   letter-spacing: 0.17vw;
   text-transform: uppercase;

   header {
      position: relative;
      width: 100vw;
      height: 3vw;
      background: $black;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .menu {
         * {
            padding: 2vw;
            transition: background 0.2s;
            cursor: pointer;

            &:hover {
               background: rgba(255, 255, 255, 0.1);
            }
            &:active {
               background: rgba(255, 255, 255, 0.2);
            }
            &.active {
               background: rgba(255, 255, 255, 0.1);
            }
         }
      }

      .currency_choice {
         color: $white;
         background: $black;
      }
   }
}
@media (width < 768px) {
   * {
      font-size: 3vw;
      letter-spacing: 0.5vw;

      header {
         height: 10vw;

         .menu {
            * {
               padding: 4vw;
            }
         }
      }
   }
}
</style>
