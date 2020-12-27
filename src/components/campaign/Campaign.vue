<template>
  <div>
    <router-link
      :to="{
        name: 'campaign-edit',
        params: { campaignUrl: campaign._links.self.href },
      }"
    >
      edit
    </router-link>
    <button @click="deleteCampaign">delete</button>
    <img :src="campaign.imageUrl" />
    <img :src="campaign.mapUrl" />
    <h2>{{ campaign.name }}</h2>
    <p>{{ campaign.description }}</p>
    <ul>
      <router-link :to="{
        name: 'planet-new',
        params: { campaignUrl: campaign._links.self.href },
      }"
      >add planet...</router-link>
      <li v-for="planet in planets" :key="planet._links.self.href">
        <router-link
          :to="{
            name: 'planet',
            params: { planetUrl: planet._links.self.href },
          }"
        >
          <div>
            <img :src="planet.imageUrl" />
            <h2>{{ planet.name }}</h2>
            <p>{{ planet.description }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
export default {
  name: "Campaign",
  props: ["campaignUrl"],
  data() {
    return {
      campaign: {
        _links: {
          self: {
            href: "not yet defined"
          }
        }
      },
      planets: [],
    };
  },
  methods: {
    deleteCampaign() {
      axios
        .delete(this.campaignUrl)
        .then(() => (this.$router.push({name: "campaign-list"})));
    },
    getCampaign(campaignUrl) {
      axios
        .get(campaignUrl)
        .then((response) => {
          this.campaign = response.data
          this.getPlanets(response.data._links.planets.href)
        });
    },
    getPlanets(planetsUrl) {
      axios
        .get(planetsUrl)
        .then((response) => (this.planets = response.data._embedded.planets));
    }
  },
  mounted() {
    this.getCampaign(this.campaignUrl)
  },
};
</script>