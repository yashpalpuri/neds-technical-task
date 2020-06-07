<template>
  <div class="home">
    <NextToGoRacesList></NextToGoRacesList>
  </div>
</template>

<script>
// @ is an alias to /src
import NextToGoRacesList from "@/components/next-to-go-races/List.vue";

export default {
  name: "Home",
  components: {
    NextToGoRacesList
  }
};
</script>
