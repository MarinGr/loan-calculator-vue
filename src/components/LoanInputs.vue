<template>
  <section class="calc__inputs-section">
    <div class="calc__amount">
      <label class="input-group__label">Loan Amount</label>
      <div class="amount__amount-block">
        <input
          class="amount-block__input"
          type="number"
          required
          :value="amount"
          @input="setAmount"
        />
        <input
          class="amount-block__slider"
          :value="amount"
          @input="setAmount"
          type="range"
          :min="minAmount"
          :max="maxAmount"
          ref="slider"
          :style="{ backgroundSize: sliderFill }"
        />
      </div>
    </div>

    <div class="calc__conditions">
      <div class="conditions__input-group">
        <label class="input-group__label">Loan terms, months</label>
        <select :value="term" @change="selectTerm" class="input-group__select">
          <option v-for="option in termOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="conditions__input-group">
        <label class="input-group__label">Interest rate, %</label>
        <input
          type="number"
          required
          :value="rate"
          @input="setRate"
          class="input-group__rate-input"
        />
      </div>
    </div>

    <div class="monthly-payment">
      <p class="monthly-payment__desc">Monthly payment</p>
      <p class="monthly-payment__amount">{{ monthlyPaymentFormatted }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const amount = computed(() => store.state.amount);
const term = computed(() => store.state.term);
const termOptions = computed(() => store.state.termOptions);
const rate = computed(() => store.state.rate);
const monthlyPaymentFormatted = computed(
  () => store.getters.monthlyPaymentFormatted
);

let slider = ref(null);

let minAmount = 0;
let maxAmount = 5000000;

let sliderBgSize = `${
  ((amount.value - minAmount) / (maxAmount - minAmount)) * 100
}% 100%`;

let sliderFill = ref(sliderBgSize);

const updateAmount = (value) => store.commit("updateAmount", value);
const selectTerm = (e) => store.commit("selectTerm", e.target.value);
const updateRate = (value) => store.commit("updateRate", value);
const setErrorMessage = (message) => store.commit("setErrorMessage", message);

const setAmount = (e) => {
  if (e.target.value > 5000000) {
    e.target.value = 5000000;
  }

  if (e.target.value < 0) {
    e.target.value = 0;
  }

  updateAmount(e.target.value);
};

const setRate = (e) => {
  if (e.target.value == "") {
    setErrorMessage("Please enter an interest rate");
  } else {
    setErrorMessage("");

    if (e.target.value > 25) {
      e.target.value = 25;
    }

    if (e.target.value < 0) {
      e.target.value = 1;
    }
  }

  updateRate(e.target.value);
};

watch(amount, (newVal) => {
  sliderFill = `${
    ((newVal - slider.value.min) * 100) / (slider.value.max - slider.value.min)
  }%, 100%`;
});
</script>

<style scoped>
.calc__inputs-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
}

.input-group__label {
  display: block;
  flex: 1;
  margin-bottom: 10px;
}

.amount__amount-block {
  position: relative;
}

.amount-block__input {
  display: block;
  width: 100%;
  padding: 12px 14px 16px;
  background-size: v-bind("sliderFill");
}
.amount-block__slider {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.calc__conditions {
  display: flex;
  gap: 40px;
}

.conditions__input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: 50%;
}

.input-group__select {
  -webkit-appearance: none;
  appearance: none;
  flex: 1;
  padding: 14px;
  width: 100%;
  cursor: pointer;
}

.input-group__rate-input {
  flex: 1;
  padding: 14px;
  width: 100%;
}

.monthly-payment {
  padding: 40px;
  border-top: 2px solid var(--border-color);
  text-align: center;
  font-weight: 600;
}
.monthly-payment__desc {
  margin-bottom: 16px;
  font-size: 20px;
}
.monthly-payment__amount {
  font-size: 32px;
  color: var(--primary-color);
}
</style>
