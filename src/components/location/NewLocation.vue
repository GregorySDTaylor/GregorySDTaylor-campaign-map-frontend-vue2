<template>
  <div>
    <form @submit="createLocation">
      <h1>New Location</h1>
      <location-input v-bind.sync="location" />
      <img :src="location.imageUrl" />
      <input type="submit" value="create new location" />
    </form>
  </div>
</template>

<script>
import LocationInput from "@/components/location/LocationInput.vue";
import axios from "@/campaignmap-restapi-axios.js";
export default {
  components: {
    LocationInput,
  },
  props: ["planetUrl"],
  name: "NewLocation",
  data() {
    return {
      location: {
        planet: this.planetUrl,
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
    createLocation() {
      axios.post("/locations", this.location).then(() => {
        this.$router.push({
          name: "planet",
          params: {
            planetUrl: this.planetUrl,
          },
        });
      });
    },
  },
};
</script>