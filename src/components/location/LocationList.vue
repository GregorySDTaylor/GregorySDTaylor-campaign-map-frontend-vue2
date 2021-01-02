<template>
  <v-container>
    <v-row class="my-16">
      <h2 class="ma-6 text-h2">Locations</h2>
      <v-spacer />
      <v-btn
        class="ma-6"
        color="primary"
        right
        @click="
          $router.push({
            name: 'location-new',
            params: { planetUrl: planet._links.self.href },
          })
        "
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-col
        v-for="location in locations"
        :key="location._links.self.href"
        sm="12"
        md="6"
        lg="4"
        xl="3"
      >
        <location-list-item :location="location" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import LocationListItem from "@/components/location/LocationListItem.vue";

export default {
  components: {
    LocationListItem,
  },
  name: "LocationList",
  props: ["planet"],
  data() {
    return {
      locations: [],
    };
  },
  methods: {
    getLocations() {
      axios.get(this.planet._links.locations.href).then((response) => {
        this.locations = response.data._embedded.locations;
      });
    },
  },
  watch: {
    planet() {
      this.getLocations();
    },
  },
};
</script>