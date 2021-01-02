<template>
  <v-card
    color="rgba(18,18,18,1)"
    class="ma-6"
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
      <h3 class="ma-6 text-h3">{{ planet.name }}</h3>
    </v-img>
    <p class="ma-6">{{ planet.description }}</p>
  </v-card>
</template>

<script>
export default {
  name: "PlanetListItem",
  props: ["planet"],
};
</script>