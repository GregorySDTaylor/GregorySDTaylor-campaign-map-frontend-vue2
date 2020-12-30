<template>
  <div>
    <form @submit="createPlanet">
      <h1>New Planet</h1>
      <planet-input v-bind.sync="planet" />
      <img :src="planet.imageUrl" />
      <img :src="planet.mapUrl" />
      <input type="submit" value="create new planet" />
    </form>
  </div>
</template>

<script>
import PlanetInput from "@/components/planet/PlanetInput.vue";
import axios from "@/campaignmap-restapi-axios.js";
export default {
  components: {
    PlanetInput,
  },
  props: ["campaignUrl"],
  name: "NewPlanet",
  data() {
    return {
      planet: {
        campaign: this.campaignUrl,
        name: null,
        description: null,
        diameterInKm: null,
        imageUrl: null,
        mapUrl: null,
      },
    };
  },
  methods: {
    createPlanet() {
      axios.post("/planets", this.planet).then((response) => {
        this.$router.push({
          name: "planet",
          params: {
            planetUrl: response.data._links.self.href,
          },
        });
      });
    },
  },
};
</script>