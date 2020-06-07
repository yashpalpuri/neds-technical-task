import * as type from "@/constants/mutation-types";
import { NextToGoRacesState } from "@/typing/store";
import { Race } from "@/typing/entity";

type SetRaceListPayload = {
  race_summaries: Record<string, Race>;
  next_to_go_ids: string[];
};

export default {
  [type.SET_RACE_LIST](state: NextToGoRacesState, payload: SetRaceListPayload) {
    state.races = payload.race_summaries;
    state.raceList = payload.next_to_go_ids.sort((idF, idL) => {
      return state.races[idF].advertised_start.seconds <
        state.races[idL].advertised_start.seconds
        ? 1
        : 0;
    });
    state.displayingRaceList = state.raceList.slice(
      state.startIndex,
      state.startIndex + 5
    );
  },
  [type.REMOVE_RACE](state: NextToGoRacesState, race: Race) {
    if (
      race &&
      state.raceList.indexOf(race.race_id) > -1 &&
      state.races[race.race_id]
    ) {
      state.raceList.splice(state.raceList.indexOf(race.race_id), 1);
      delete state.races[race.race_id];
    }
  },
  [type.SET_DISPLAYING_RACE_LIST](state: NextToGoRacesState) {
    state.displayingRaceList = state.filteredRaceList.slice(
      state.startIndex,
      state.startIndex + 5
    );
  },
  [type.FETCHING_RACE_LIST](state: NextToGoRacesState) {
    state.loading = true;
  },
  [type.FETCHING_RACES_LIST_SUCCESS](state: NextToGoRacesState) {
    state.loading = false;
  },
  [type.FETCHING_RACE_LIST_ERROR](state: NextToGoRacesState) {
    state.loading = false;
  },
  [type.SET_DISPLAYING_RACE_LIST_FILTER](
    state: NextToGoRacesState,
    category: string
  ) {
    state.selectedCategory = category;
    state.filteredRaceList = [];
    state.raceList.map(raceId => {
      if (state.races[raceId].category_id === category || category === "") {
        state.filteredRaceList.push(raceId);
      }
    });
  }
};
