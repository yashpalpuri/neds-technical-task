import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { getters, actions } from "../../mock/nextToGoRaces.store";
import NextToGoRacesList from "@/components/next-to-go-races/List.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("List.vue", () => {
  let storeMocks;
  let wrapper;

  beforeEach(() => {
    storeMocks = new Vuex.Store({
      getters,
      actions
    });
    wrapper = shallowMount(NextToGoRacesList, {
      store: storeMocks,
      localVue
    });
  });

  test("It should fetch next to go races", () => {
    expect(actions["NextToGoRaces/fetchRaces"]).toHaveBeenCalled();
  });

  test("It should set filter on clicking a category button", () => {
    wrapper.find("div[role='button']").trigger("click");
    expect(actions["NextToGoRaces/setFilter"]).toHaveBeenCalled();
  });
});
