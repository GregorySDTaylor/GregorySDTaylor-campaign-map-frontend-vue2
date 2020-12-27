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
    <ul>
      <li v-for="location in locations" :key="location._links.self.href">
        <!-- <router-link
          :to="{
            name: 'location',
            params: { locationUrl: location._links.self.href },
          }"
        > -->
          <div>
            <img :src="location.imageUrl" />
            <h2>{{ location.name }}</h2>
            <p>{{ location.description }}</p>
          </div>
        <!-- </router-link> -->
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
export default {
  name: "Planet",
  props: [
      "planetUrl",
      "campaignUrl"
    ],
  data() {
    return {
      planet: {
        _links: {
          self: {
            href: this.planetUrl
          }
        }
      },
      campaign: {
        _links: {
          self: {
            href: this.campaignUrl
          }
        }
      },
      locations: [],
    };
  },
  methods: {
    deletePlanet() {
      axios
        .delete(this.planetUrl)
        .then(() => (this.$router.push(
          {
            name: "campaign",
            params: {
              campaignUrl: this.campaign._links.self.href
            }
          })));
    },
    getCampaign(campaignUrl) {
      axios
        .get(campaignUrl)
        .then((response) => {
          this.campaign = response.data
        });
    },
    getPlanet(planetUrl) {
      axios
        .get(planetUrl)
        .then((response) => {
          this.planet = response.data
          this.getLocations(response.data._links.locations.href)
          this.getCampaign(response.data._links.campaign.href)
        });
    },
    getLocations(locationsUrl) {
      axios
        .get(locationsUrl)
        .then((response) => (this.locationsUrl = response.data._embedded.locations));
    }
  },
  mounted() {
    this.getPlanet(this.planetUrl)
  },
};
</script>