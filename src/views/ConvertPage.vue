<script setup lang="ts">
import { ref, watch } from "vue";
import Dropdown from "../components/Dropdown.vue";
import { useCurrencyStore } from "../stores/currency";

const currencyStore = useCurrencyStore();
const amountFrom = ref("");
const amountTo = ref("");
const isValidAmountFrom = ref(true);
const isValidAmountTo = ref(true);
const fromCurrency = ref(currencyStore.fromCurrency);
const toCurrency = ref(currencyStore.toCurrency);

function handleDropdown1Click(currency: string) {
   fromCurrency.value = currency;
}
function handleDropdown2Click(currency: string) {
   toCurrency.value = currency;
}

function validateInput(type: "from" | "to") {
   const value = type === "from" ? amountFrom.value : amountTo.value;
   const isValid =
      value === "" || value === "." || value === "0" || isNaN(Number(value));
   if (type === "from") {
      isValidAmountFrom.value = !isValid;
   } else {
      isValidAmountTo.value = !isValid;
   }

   if (!isValid) {
      convert(type);
   }
}

const convert = (type: "from" | "to") => {
   if (fromCurrency.value === toCurrency.value) {
      if (type === "from") {
         amountTo.value = amountFrom.value;
      } else {
         amountFrom.value = amountTo.value;
      }
      return;
   }
   if (type === "from") {
      const rateFrom = currencyStore.getRate(
         `${fromCurrency.value.toLowerCase()}-${toCurrency.value.toLowerCase()}`
      );
      if (rateFrom === null) {
         amountTo.value = "КУРС НЕ НАЙДЕН";
         return;
      }
      amountTo.value = (parseFloat(amountFrom.value) * rateFrom).toFixed(2);
   } else if (type === "to") {
      const rateTo = currencyStore.getRate(
         `${toCurrency.value.toLowerCase()}-${fromCurrency.value.toLowerCase()}`
      );
      if (rateTo === null) {
         amountFrom.value = "КУРС НЕ НАЙДЕН";
         return;
      }
      amountFrom.value = (parseFloat(amountTo.value) * rateTo).toFixed(2);
   }
};

watch([fromCurrency, toCurrency], () => {
   if (isValidAmountFrom.value) convert("from");
   if (isValidAmountTo.value) convert("to");
});
</script>

<template>
   <div class="converter">
      <div class="container">
         <h1>конвертация</h1>
         <div class="converter_1">
            <input
               @input="validateInput('from')"
               type="text"
               :class="{ error: !isValidAmountFrom }"
               v-model="amountFrom"
            />
            <div class="converter_1-dropdown">
               <Dropdown
                  :handleDropdownClick="handleDropdown1Click"
                  :currency="fromCurrency"
               />
            </div>
         </div>
         <div class="converter_2">
            <input
               @input="validateInput('to')"
               type="text"
               :class="{ error: !isValidAmountTo }"
               v-model="amountTo"
            />
            <div class="converter_2-dropdown">
               <Dropdown
                  :handleDropdownClick="handleDropdown2Click"
                  :currency="toCurrency"
               />
            </div>
         </div>
      </div>
      <p :class="{ error: !isValidAmountFrom || !isValidAmountTo }">
         Введите число!
      </p>
   </div>
</template>

<style scoped lang="scss">
@use "../assets/main.scss" as *;

.converter {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: calc(100vh - 3vw);
   .container {
      div {
         display: flex;
         justify-content: space-between;
         background: $black;
         width: 100%;
         border-radius: 1vw;

         input {
            appearance: none;
            padding: 1vw;
            font-size: 1vw;
            text-align: right;
            background: $white;
            width: 100%;
            border-radius: 1vw 0 0 1vw;
         }

         div {
            position: relative;
            width: fit-content;
            border-radius: 1vw;
         }
      }
   }
   p {
      opacity: 0;
      margin-top: 1vw;
      color: rgb(183, 17, 17);
      font-weight: 700;
      font-size: 0.8vw;
      letter-spacing: 0.04vw;
   }
   .error {
      opacity: 1;
   }
}

@media (width < 768px) {
   .converter {
      height: calc(100vh - 10vw);

      .container {
         div {
            border-radius: 3vw;

            input {
               font-size: 4vw;
               padding: 4vw;
               border-radius: 3vw 0 0 3vw;
            }
         }
      }
      p {
         font-size: 3.5vw;
         margin-top: 5vw;
      }
   }
}
</style>
