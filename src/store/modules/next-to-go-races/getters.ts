import { NextToGoRacesState } from "@/typing/store";

export default {
  raceList: (state: NextToGoRacesState) =>
    state.raceList.map(raceId => state.races[raceId]),
  displayingRaceList: (state: NextToGoRacesState) =>
    state.displayingRaceList.map(raceId => state.races[raceId])
};
