import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export const NextToGoRaces = {
  namespaced: true,
  state: {
    races: {},
    raceList: [],
    displayingRaceList: [],
    startIndex: 0,
    selectedCategory: "",
    filteredRaceList: [],
    loading: false
  },
  getters: getters,
  actions: actions,
  mutations: mutations
};
