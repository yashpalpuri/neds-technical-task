<template>
  <div class="next-to-go-races-list__container">
    <div class="title">Next to go races</div>
    <div class="filters-row">
      <div role="button" @click="selectFilter('')">
        <span>All</span>
      </div>
      <div role="button" @click="selectFilter(CATEGORIES_ID.GREY_HOUND)">
        <span>Greyhound</span>
      </div>
      <div role="button" @click="selectFilter(CATEGORIES_ID.HARNESS)">
        <span>Harness</span>
      </div>
      <div role="button" @click="selectFilter(CATEGORIES_ID.HORSE_RACING)">
        <span>Horse</span>
      </div>
    </div>
    <transition-group tag="div" class="entries-row" name="fade" mode="out-in">
      <NextToGoRacesEntry
        v-for="race in raceList"
        :key="race.race_id"
        :data="race"
      ></NextToGoRacesEntry>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import NextToGoRacesEntry from "./Entry.vue";
import { CATEGORIES_ID } from "@/constants/categories";

export default Vue.extend({
  name: "NextToGoRacesList",
  components: {
    NextToGoRacesEntry
  },
  data() {
    return {
      CATEGORIES_ID
    };
  },
  computed: {
    ...mapGetters({
      raceList: "NextToGoRaces/displayingRaceList"
    })
  },
  methods: {
    ...mapActions({
      fetchRaces: "NextToGoRaces/fetchRaces",
      setFilter: "NextToGoRaces/setFilter"
    }),
    selectFilter(categoryId: string) {
      this.setFilter(categoryId);
    }
  },
  mounted() {
    this.fetchRaces();
  }
});
</script>

<style scoped lang="scss">
.next-to-go-races-list__container {
  .filters-row {
    display: flex;
    justify-content: flex-end;
    & > div {
      padding: 6px 12px;
      border: 1px solid #cecece;
      &:last-child {
        border-left: 0;
      }
      &:first-child {
        border-right: 0;
      }
      &:hover {
        cursor: pointer;
      }
    }
    margin-bottom: 15px;
  }
  .entries-row {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
    & > div {
      width: calc(20% - 10px);
      margin-top: 15px;
      @media screen and (max-width: 1300px) {
        width: calc(25% - 10px);
      }
      @media screen and (max-width: 992px) {
        width: calc(33% - 10px);
      }
      @media screen and (max-width: 776px) {
        width: 100%;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
  .fade-leave-active {
    position: absolute;
  }
}
</style>
