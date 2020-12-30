<template>
  <div>
    <form @submit="updatePlanet">
      <h1>Edit Planet</h1>
      <planet-input v-bind.sync="planet" />
      <img :src="planet.imageUrl" />
      <img :src="planet.mapUrl" />
      <input type="submit" value="update planet" />
    </form>
  </div>
</template>

<script>
import PlanetInput from "@/components/planet/PlanetInput.vue";
import axios from "@/campaignmap-restapi-axios.js";
export default {
  name: "EditPlanet",
  components: {
    PlanetInput,
  },
  props: ["planetUrl"],
  data() {
    return {
      planet: {
        campaign: null,
        name: null,
        description: null,
        diameterInKm: null,
        imageUrl: null,
        mapUrl: null,
      },
    };
  },
    methods: {
    updatePlanet() {
      axios.patch(this.planetUrl, this.planet).then(() => {
        this.$router.push({
          name: "planet",
          params: {
            planetUrl: this.planetUrl,
          },
        });
      });
    },
  },
  mounted() {
    axios
      .get(this.planetUrl)
      .then((response) => (this.planet = response.data));
  },
};
</script>