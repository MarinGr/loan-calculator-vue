import { createStore } from "vuex";
import formatNumbers from "../helpers/formatNumbers";

export default createStore({
  state: {
    amount: 1095000,
    term: 12,
    termOptions: [3, 6, 9, 12, 18, 24, 36, 48],
    rate: 10,
    errorMessage: "",
  },
  getters: {
    monthlyRate(state) {
      if (state.rate == "") {
        return;
      }
      return state.rate / 12 / 100;
    },

    coefficient(state, getters) {
      if (getters.monthlyRate == undefined) {
        return false;
      }
      return (
        (getters.monthlyRate * Math.pow(1 + getters.monthlyRate, state.term)) /
        (Math.pow(1 + getters.monthlyRate, state.term) - 1)
      );
    },

    monthlyPayment(state, getters) {
      if (!getters.coefficient) {
        return 0;
      }
      return (state.amount * getters.coefficient).toFixed(2);
    },

    monthlyPaymentFormatted(state, getters) {
      if (getters.monthlyPayment == 0) {
        return 0;
      }
      return formatNumbers(getters.monthlyPayment);
    },

    totalPayment(state, getters) {
      if (getters.monthlyPayment == 0) {
        return 0;
      }
      return (getters.monthlyPayment * state.term).toFixed(2);
    },

    totalPaymentFormatted(state, getters) {
      return formatNumbers(getters.totalPayment);
    },

    totalInterest(state, getters) {
      if (getters.totalPayment == 0) {
        return 0;
      }
      return (getters.totalPayment - state.amount).toFixed(2);
    },

    totalInterestFormatted(state, getters) {
      return formatNumbers(getters.totalInterest);
    },

    amountFormatted(state) {
      if (state.amount == 0) {
        return 0;
      }
      return formatNumbers(state.amount);
    },
  },
  mutations: {
    updateAmount(state, amount) {
      state.amount = amount;
    },

    selectTerm(state, term) {
      state.term = term;
    },

    updateRate(state, rate) {
      state.rate = rate;
    },

    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
  },
});
