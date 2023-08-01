<template>
  <section class="calc__result-section">
    <PieChart />
    <div class="calc__results-info">
      <div class="calc__result">
        <div class="result__label">
          <div class="label__badge label__badge--principal"></div>
          <p class="label__desc">Principal</p>
        </div>
        <div class="label__amount">{{ amountFormatted }}</div>
      </div>
      <div class="calc__result">
        <div class="result__label">
          <div class="label__badge label__badge--interest"></div>
          <p class="label__desc">Interest</p>
        </div>
        <div class="label__amount">{{ totalInterestFormatted }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import PieChart from "../components/PieChart.vue";

const store = useStore();

const amountFormatted = computed(() => store.getters.amountFormatted);
const totalInterestFormatted = computed(
  () => store.getters.totalInterestFormatted
);
</script>

<style scoped>
.calc__result-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.calc__results-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: 100%;
}

.calc__result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.result__label {
  display: flex;
  align-items: center;
  gap: 8px;
}
.label__badge {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.label__badge--principal {
  background-color: var(--principal-color);
}

.label__badge--interest {
  background-color: var(--interest-color);
}
.label__desc {
  font-size: 14px;
}
.label__amount {
  font-weight: 600;
}
</style>
