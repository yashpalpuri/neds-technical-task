import * as type from "@/constants/mutation-types";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const getters = {
  "NextToGoRaces/raceList": jest.fn().mockReturnValue([]),
  "NextToGoRaces/displayingRaceList": jest.fn().mockReturnValue([])
};

export const mutations = {
  [type.SET_RACE_LIST]: jest.fn(),
  [type.REMOVE_RACE]: jest.fn(),
  [type.SET_DISPLAYING_RACE_LIST]: jest.fn(),
  [type.FETCHING_RACE_LIST]: jest.fn(),
  [type.FETCHING_RACES_LIST_SUCCESS]: jest.fn(),
  [type.FETCHING_RACE_LIST_ERROR]: jest.fn(),
  [type.SET_DISPLAYING_RACE_LIST_FILTER]: jest.fn()
};

export const actions = {
  "NextToGoRaces/fetchRaces": jest.fn(),
  "NextToGoRaces/removeRace": jest.fn(),
  "NextToGoRaces/setFilter": jest.fn()
};
