<template>
  <v-container>
    <v-row class="my-16">
      <span>
        <h1 class="ma-6 text-h1">{{ planet.name }}</h1>
      </span>
      <v-spacer />
      <edit-planet-dialog
        :planet="planet"
        @update:planet="getPlanet(planetUrl)"
      />
      <delete-planet-dialog
        :planet="planet"
        :campaignUrl="campaign._links.self.href"
      />
    </v-row>
    <v-row class="my-16">
      <v-col cols="12" class="hidden-lg-and-up">
        <v-img :src="planet.imageUrl" />
      </v-col>
      <v-col sm="12" lg="8" xl="6">
        <p>{{ planet.description }}</p>
      </v-col>
      <v-col lg="4" xl="6" class="hidden-md-and-down">
        <v-img :src="planet.imageUrl" />
      </v-col>
    </v-row>
    <router-link
      :to="{
        name: 'location-new',
        params: { planetUrl: planet._links.self.href },
      }"
    >
      add location
    </router-link>
    <ul>
      <li v-for="location in locations" :key="location._links.self.href">
        <location-list-item
          :location="location"
          @locationDeleted="getLocations(planet._links.locations.href)"
        />
      </li>
    </ul>
  </v-container>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import LocationListItem from "@/components/location/LocationListItem.vue";
import DeletePlanetDialog from "@/components/planet/DeletePlanetDialog.vue";
import EditPlanetDialog from "@/components/planet/EditPlanetDialog.vue";

export default {
  components: { LocationListItem, DeletePlanetDialog, EditPlanetDialog },
  name: "Planet",
  props: ["planetUrl", "campaignUrl"],
  data() {
    return {
      planet: {
        _links: {
          self: {
            href: this.planetUrl,
          },
        },
      },
      campaign: {
        _links: {
          self: {
            href: this.campaignUrl,
          },
        },
      },
      locations: [],
      factions: [],
    };
  },
  methods: {
    deletePlanet() {
      axios.delete(this.planetUrl).then(() =>
        this.$router.push({
          name: "campaign",
          params: {
            campaignUrl: this.campaign._links.self.href,
          },
        })
      );
    },
    getCampaign(campaignUrl) {
      axios.get(campaignUrl).then((response) => {
        this.campaign = response.data;
        this.getFactions(response.data._links.factions.href);
      });
    },
    getFactions(factionUrl) {
      axios.get(factionUrl).then((response) => {
        this.factions = response.data._embedded.factions;
      });
    },
    getPlanet(planetUrl) {
      axios.get(planetUrl).then((response) => {
        this.planet = response.data;
        this.getLocations(response.data._links.locations.href);
        this.getCampaign(response.data._links.campaign.href);
      });
    },
    getLocations(locationsUrl) {
      axios.get(locationsUrl).then((response) => {
        this.locations = response.data._embedded.locations;
      });
    },
  },
  mounted() {
    this.getPlanet(this.planetUrl);
  },
};
</script>