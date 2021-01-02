<template>
  <v-card
    @click="
      $router.push({
        name: 'planet',
        params: { planetUrl: planet._links.self.href },
      })
    "
  >
    <v-img
      gradient="to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%,rgba(30,30,30,1) 80%, rgba(30,30,30,1) 100%"
      max-height="100"
      :src="planet.imageUrl"
    >
      <span>
        <h3 class="ma-6 text-h3">{{ planet.name }}</h3>
      </span>
    </v-img>
    <v-card-text>
      {{ truncatedDescription }}
    </v-card-text>
  </v-card>
</template>

<script>
const descriptionLimit = 160;
export default {
  name: "PlanetListItem",
  props: ["planet"],
  computed: {
    truncatedDescription() {
      if (this.planet.description.length < descriptionLimit) {
        return this.planet.description;
      } else {
        return this.planet.description.slice(0, descriptionLimit) + "...";
      }
    },
  },
};
</script>