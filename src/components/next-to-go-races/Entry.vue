<template>
  <div class="next-to-go-races-entry__container">
    <div class="race-info__container">
      <div>
        <span class="category-label">{{ category }}</span>
      </div>
      <div :class="{ 'negative-time': isNegative }">
        <div>
          <span>{{ data.meeting_name }}</span>
          <span> - </span>
          <span>R{{ data.race_number }}</span>
        </div>
        <div class="timer">
          <span>{{ duration }}</span>
        </div>
      </div>
    </div>
    <div class="race-timer-progress-bar">
      <div class="progress" :style="{ width: progress }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import { CATEGORIES_ID, CATEGORY_TEXT } from "@/constants/categories";

export default Vue.extend({
  name: "NextToGoRacesEntry",
  props: {
    data: Object
  },
  data() {
    return {
      duration: "",
      requestAnimationFrame: 0,
      progress: "0",
      startTime: new Date().getTime() / 1000,
      isNegative: false
    };
  },
  computed: {
    category() {
      const ids: { [key: string]: string } = CATEGORIES_ID;
      const categoryTexts: { [key: string]: string } = CATEGORY_TEXT;
      for (const key in ids) {
        if (ids[key] === this.data.category_id) {
          return categoryTexts[key];
        }
      }
      return "";
    }
  },
  methods: {
    ...mapActions({
      removeRace: "NextToGoRaces/removeRace"
    }),
    timer() {
      const currentSeconds = new Date().getTime() / 1000;
      this.progress =
        ((currentSeconds - this.startTime) /
          (this.data.advertised_start.seconds + 60 - this.startTime)) *
          100 +
        "%";
      if (this.data.advertised_start.seconds - currentSeconds > 60) {
        this.duration = `${Math.floor(
          (this.data.advertised_start.seconds - currentSeconds) / 60
        )}m ${Math.floor(
          (this.data.advertised_start.seconds - currentSeconds) % 60
        )}s`;
      } else if (this.data.advertised_start.seconds - currentSeconds >= 0) {
        this.duration = `${Math.floor(
          this.data.advertised_start.seconds - currentSeconds
        )}s`;
      } else if (
        this.data.advertised_start.seconds - currentSeconds < 0 &&
        this.data.advertised_start.seconds - currentSeconds > -60
      ) {
        this.isNegative = true;
        this.duration = `${Math.floor(
          this.data.advertised_start.seconds - currentSeconds
        )}s`;
      } else if (this.data.advertised_start.seconds - currentSeconds < -60) {
        this.removeRace(this.data);
      }
      this.requestAnimationFrame = requestAnimationFrame(this.timer);
    }
  },
  mounted() {
    this.timer();
  },
  destroyed() {
    cancelAnimationFrame(this.requestAnimationFrame);
  }
});
</script>

<style scoped lang="scss">
.next-to-go-races-entry__container {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  background: #fff;
  border-radius: 2px;

  .race-info__container {
    display: flex;
    justify-content: space-between;
    padding: 10px 12px;
    .category-label {
      font-weight: bold;
    }
    .negative-time {
      .timer {
        color: red;
        font-weight: bold;
      }
    }
  }
  .race-timer-progress-bar {
    height: 3px;
    width: 100%;
    .progress {
      position: relative;
      top: 1px;
      height: 4px;
      background-color: red;
    }
  }
}
</style>
