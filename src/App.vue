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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color-primary);
  background: var(--white);
  border-radius: 20px;
  padding: 32px;
  background: var(--app-bg-color);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid var(--border-color);
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
