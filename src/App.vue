<template>
  <h1 class="app-title">Loan Calculator</h1>
  <div v-show="errorMessage" class="calc__error-message">
    {{ errorMessage }}
  </div>
  <div class="calc__container">
    <LoanInputs />
    <LoanResults />
  </div>
</template>

<script setup>
import LoanInputs from "./components/LoanInputs.vue";
import LoanResults from "./components/LoanResults.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const errorMessage = computed(() => store.state.errorMessage);
</script>

<style>
#app {
  background: var(--app-bg-color);
  color: var(--text-color-primary);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.app-title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 32px;
}

.calc__container {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.calc__error-message {
  background-color: var(--error-bg-color);
  color: var(--error-color);
  padding: 14px 16px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}
</style>
