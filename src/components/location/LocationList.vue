<template>
  <v-container>
    <v-row class="my-16">
      <v-img
        gradient="to left, rgba(0,0,0,0) 0%, rgba(18,18,18,1) 80%"
        max-height="300"
        position="top"
        :src="planet.mapUrl"
      >
        <v-row>
          <span>
            <h2 class="ma-6 text-h2">Locations</h2>
          </span>
          <v-spacer />
          <new-location-dialog :planetUrl="planet._links.self.href" />
        </v-row>
      </v-img>
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
        <location-list-item
          :campaignUrl="campaignUrl"
          :planetUrl="planet._links.self.href"
          :location="location"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import LocationListItem from "@/components/location/LocationListItem.vue";
import NewLocationDialog from "./NewLocationDialog.vue";

export default {
  components: {
    LocationListItem,
    NewLocationDialog,
  },
  name: "LocationList",
  props: ["campaignUrl", "planet"],
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