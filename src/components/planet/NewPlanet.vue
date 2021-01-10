<template>
  <v-card>
    <v-form @submit="createPlanet">
      <v-card-title class="ma-6 text-h1">New Planet</v-card-title>
      <planet-input class="ma-6" v-bind.sync="planet" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-6" color="primary" @click="$emit('close')">
          Close
        </v-btn>
        <v-btn class="ma-6" type="submit" color="primary"
          >create new planet</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
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
            campaignUrl: this.campaignUrl,
            planetUrl: response.data._links.self.href,
          },
        });
      });
    },
  },
};
</script>