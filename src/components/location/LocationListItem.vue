<template>
  <v-card
    @click="
      $router.push({
        name: 'location',
        params: { locationUrl: location._links.self.href },
      })
    "
  >
    <v-img
      gradient="to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%,rgba(30,30,30,1) 80%, rgba(30,30,30,1) 100%"
      max-height="100"
      :src="location.imageUrl"
    >
      <span>
        <h3 class="ma-6 text-h3">{{ location.name }}</h3>
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
  name: "LocationListItem",
  props: ["location"],
  computed: {
    truncatedDescription() {
      if (this.location.description.length < descriptionLimit) {
        return this.location.description;
      } else {
        return this.location.description.slice(0, descriptionLimit) + "...";
      }
    },
  },
};
</script>