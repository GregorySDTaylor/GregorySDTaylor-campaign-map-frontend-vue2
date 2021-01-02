<template>
  <v-card>
    <v-form @submit="updatePlanet">
      <v-card-title class="ma-6 text-h1">Edit Planet</v-card-title>
      <planet-input class="ma-6" v-bind.sync="planet" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-6" color="primary" @click="$emit('close')">
          Close
        </v-btn>
        <v-btn class="ma-6" type="submit" color="primary" @click="$emit('close')"
          >Save</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
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
        this.$emit("update:planet");
      });
    },
  },
  mounted() {
    axios.get(this.planetUrl).then((response) => (this.planet = response.data));
  },
};
</script>