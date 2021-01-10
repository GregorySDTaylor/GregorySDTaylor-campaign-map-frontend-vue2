<template>
  <v-card>
    <v-form @submit="updateLocation">
      <v-card-title class="ma-6 text-h1">Edit Location</v-card-title>
      <location-input v-bind.sync="location" :planet="planet" class="ma-6" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-6" color="primary" @click="$emit('close')">
          Close
        </v-btn>
        <v-btn
          class="ma-6"
          type="submit"
          color="primary"
          @click="$emit('close')"
          >update location</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import LocationInput from "@/components/location/LocationInput.vue";
import axios from "@/campaignmap-restapi-axios.js";
export default {
  name: "EditLocation",
  components: {
    LocationInput,
  },
  props: ["locationUrl", "planet"],
  data() {
    return {
      location: {
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
        this.$emit("update:location");
      });
    },
  },
  mounted() {
    axios.get(this.locationUrl).then((response) => {
      this.location = response.data;
    });
  },
};
</script>