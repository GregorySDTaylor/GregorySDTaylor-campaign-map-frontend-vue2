<template>
  <div>
    <form @submit="updateLocation">
      <h1>Edit Location</h1>
      <location-input v-bind.sync="location" />
      <img :src="location.imageUrl" />
      <input type="submit" value="update location" />
    </form>
  </div>
</template>

<script>
import LocationInput from "@/components/location/LocationInput.vue";
import axios from "@/campaignmap-restapi-axios.js";
export default {
  name: "EditLocation",
  components: {
    LocationInput,
  },
  props: ["locationUrl"],
  data() {
    return {
      planet: null,
      location: {
        planet: null,
        controllingFaction: null,
        name: null,
        description: null,
        imageUrl: null,
        latitude: null,
        longitude: null,
      },
    };
  },
  methods: {
    updateLocation() {
      axios.patch(this.locationUrl, this.location).then(() => {
        this.$router.push({
          name: "planet",
          params: {
            planetUrl: this.planet._links.self.href,
          },
        });
      });
    },
    getPlanet(planetUrl) {
      axios.get(planetUrl).then((response) => (this.planet = response.data));
    },
  },
  mounted() {
    axios.get(this.locationUrl).then((response) => {
      this.location = response.data;
      this.getPlanet(response.data._links.planet.href);
    });
  },
};
</script>