import * as type from "@/constants/mutation-types";
import {
  NextToGoEndpoint,
  NextToGoEndpointGetRacesParams
} from "@/services/endpoints/NextToGo.endpoint";
import { Race } from "@/typing/entity";

type Context = {
  commit;
  state;
};

export default {
  fetchRaces(context: Context, params: NextToGoEndpointGetRacesParams) {
    const { commit } = context;
    commit(type.FETCHING_RACE_LIST);
    NextToGoEndpoint.getRaces(params).then(res => {
      commit(type.SET_RACE_LIST, res.data);
      commit(type.FETCHING_RACES_LIST_SUCCESS);
      commit(type.SET_DISPLAYING_RACE_LIST_FILTER, "");
      commit(type.SET_DISPLAYING_RACE_LIST);
    });
  },
  removeRace(context: Context, race: Race) {
    const { commit } = context;
    commit(type.REMOVE_RACE, race);
    commit(
      type.SET_DISPLAYING_RACE_LIST_FILTER,
      context.state.selectedCategory
    );
    commit(type.SET_DISPLAYING_RACE_LIST);
  },
  setFilter(context: Context, category: string) {
    const { commit } = context;
    commit(type.SET_DISPLAYING_RACE_LIST_FILTER, category);
    commit(type.SET_DISPLAYING_RACE_LIST);
  }
};
