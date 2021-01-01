<template>
  <div>
    <router-link
      :to="{
        name: 'planet-edit',
        params: { planetUrl: planet._links.self.href },
      }"
    >
      edit
    </router-link>
    <button @click="deletePlanet">delete</button>
    <img :src="planet.imageUrl" />
    <img :src="planet.mapUrl" />
    <h2>{{ planet.name }}</h2>
    <p>{{ planet.description }}</p>
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
        <location-list-item :location="location" @locationDeleted="getLocations(planet._links.locations.href)"/>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import LocationListItem from '../location/LocationListItem.vue';
export default {
  components: { LocationListItem },
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
        this.locations = response.data._embedded.locations
      });
    },
  },
  mounted() {
    this.getPlanet(this.planetUrl);
  },
};
</script>