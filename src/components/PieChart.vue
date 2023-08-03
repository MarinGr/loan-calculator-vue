<template>
  <div class="calc__pie-chart">
    <p class="pie-chart__desc">Total Payment</p>
    <div class="pie-chart__amount">{{ totalPaymentFormatted }}</div>
    <DoughnutChart
      ref="doughnutRef"
      :chartData="chartData"
      :options="options"
    />
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { useStore } from "vuex";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const store = useStore();

const amount = computed(() => store.state.amount);
const totalInterest = computed(() => store.getters.totalInterest);
const totalPaymentFormatted = computed(
  () => store.getters.totalPaymentFormatted
);

const data = ref([amount.value, totalInterest.value]);
const doughnutRef = ref();

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "bottom",
      align: "center",
      labels: {
        font: {
          size: 24,
        },
      },
    },
  },
});

const chartData = computed(() => ({
  labels: ["Principal", "Interest"],
  datasets: [
    {
      data: data.value,
      backgroundColor: ["#026bd4", "#9a76ee"],
    },
  ],
}));

watchEffect(() => {
  data.value = [amount.value, totalInterest.value];
});
</script>

<style scoped>
.calc__pie-chart {
  height: 300px;
  width: 300px;
  flex: 1;
  text-align: center;
}

.pie-chart__desc {
  margin-bottom: 10px;
}

.pie-chart__amount {
  font-weight: 600;
  margin-bottom: 24px;
}
</style>
