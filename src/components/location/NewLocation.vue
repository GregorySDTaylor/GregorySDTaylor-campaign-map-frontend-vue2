<template>
  <v-card>
    <v-form @submit="createLocation">
      <v-card-title class="ma-6 text-h1">New Location</v-card-title>
      <location-input
        class="ma-6"
        v-bind.sync="location"
      />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-6" color="primary" @click="$emit('close')">
          Close
        </v-btn>
        <v-btn class="ma-6" type="submit" color="primary"
          >create new location</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
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
      axios.post("/locations", this.location).then((response) => {
        this.$router.push({
          name: "location",
          params: {
            planetUrl: this.planetUrl,
            locationUrl: response.data._links.self.href,
          },
        });
      });
    },
  },
};
</script>