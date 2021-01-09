<template>
  <v-container>
    <v-row>
      <span>
        <h2 class="text-h2">Locations</h2>
      </span>
      <v-spacer />
      <new-location-dialog :planetUrl="planet._links.self.href" />
    </v-row>
    <v-row class="mb-16 mt-12">
      <v-img :src="planet.mapUrl">
        <location-map-icon
          v-for="location in locations"
          :key="location._links.self.href"
          :location="location"
          :campaign="campaign"
          :planet="planet"
        />
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
          :campaign="campaign"
          :planet="planet"
          :location="location"
          :campaignFactions="campaignFactions"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import LocationListItem from "@/components/location/LocationListItem.vue";
import NewLocationDialog from "./NewLocationDialog.vue";
import LocationMapIcon from "./LocationMapIcon.vue";

export default {
  components: {
    LocationListItem,
    NewLocationDialog,
    LocationMapIcon,
  },
  name: "LocationList",
  props: ["campaign", "planet", "campaignFactions"],
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