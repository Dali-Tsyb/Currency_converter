<script setup lang="ts">
import { ref } from "vue";
import { useCurrencyStore } from "../stores/currency";

defineProps({
   handleDropdownClick: {
      type: Function,
      default: () => {},
   },
   currency: String,
});

const dropdownIsOpen = ref(false);
const currencyStore = useCurrencyStore();
const currencies = currencyStore.currencies;
</script>

<template>
   <button @click="dropdownIsOpen = !dropdownIsOpen">
      <span>{{ currency }}</span>
      <img src="/arrow.png" alt="" />
   </button>
   <ul v-if="dropdownIsOpen">
      <li
         v-for="currency in currencies"
         :key="currency"
         @click="handleDropdownClick(currency), (dropdownIsOpen = false)"
      >
         {{ currency }}
      </li>
   </ul>
</template>

<style scoped lang="scss">
@use "../assets/main.scss" as *;

button {
   background: $black;
   position: relative;
   padding: 0 1vw;
   height: 100%;
   display: flex;
   align-items: center;
   gap: 0.3vw;
   cursor: pointer;

   span {
      color: $white;
      font-size: 1vw;
      letter-spacing: 0.17vw;
      text-transform: uppercase;
   }
   img {
      width: 1.4vw;
      opacity: 0.9;
      filter: invert(1);
   }
}
ul {
   background: $black;
   z-index: 100;
   position: absolute;
   top: 2.6vw;
   right: 0;

   li {
      font-size: 1vw;
      letter-spacing: 0.17vw;
      background: $black;
      color: $white;
      width: 6.3vw;
      padding: 1vw;
      cursor: pointer;
      transition: background 0.2s;
      &:hover {
         background: rgba(255, 255, 255, 0.1);
      }
      &:active {
         background: rgba(255, 255, 255, 0.2);
      }
   }
}

@media (width < 768px) {
   button {
      padding: 0 4vw;
      gap: 1.5vw;

      span {
         font-size: 3vw;
         letter-spacing: 0.5vw;
      }
      img {
         width: 4vw;
      }
   }
   ul {
      top: 9vw;
      li {
         font-size: 3vw;
         padding: 4vw;
         width: 20vw;
      }
   }
}
</style>
