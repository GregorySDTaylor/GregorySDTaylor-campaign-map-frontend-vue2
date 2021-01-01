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
    <div>
      <h3>planets</h3>
      <router-link
        :to="{
          name: 'planet-new',
          params: { campaignUrl: campaign._links.self.href },
        }"
        >add planet...</router-link
      >
      <ul>
        <li v-for="planet in planets" :key="planet._links.self.href">
          <planet-list-item :planet="planet" />
        </li>
      </ul>
    </div>
    <div>
      <h3>factions</h3>
      <router-link
        :to="{
          name: 'faction-new',
          params: { campaignUrl: campaign._links.self.href },
        }"
        >add faction...</router-link
      >
      <ul>
        <li v-for="faction in factions" :key="faction._links.self.href">
          <faction-list-item
            :faction="faction"
            @factionDeleted="getFactions(campaign._links.factions.href)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import PlanetListItem from "@/components/planet/PlanetListItem.vue";
import FactionListItem from "@/components/faction/FactionListItem.vue";
export default {
  components: { PlanetListItem, FactionListItem },
  name: "Campaign",
  props: ["campaignUrl"],
  data() {
    return {
      campaign: {
        _links: {
          self: {
            href: "not yet defined",
          },
        },
      },
      planets: [],
      factions: [],
    };
  },
  methods: {
    deleteCampaign() {
      axios
        .delete(this.campaignUrl)
        .then(() => this.$router.push({ name: "campaign-list" }));
    },
    getCampaign(campaignUrl) {
      axios.get(campaignUrl).then((response) => {
        this.campaign = response.data;
        this.getPlanets(response.data._links.planets.href);
        this.getFactions(response.data._links.factions.href);
      });
    },
    getPlanets(planetsUrl) {
      axios
        .get(planetsUrl)
        .then((response) => (this.planets = response.data._embedded.planets));
    },
    getFactions(factionsUrl) {
      axios
        .get(factionsUrl)
        .then((response) => (this.factions = response.data._embedded.factions));
    },
  },
  mounted() {
    this.getCampaign(this.campaignUrl);
  },
};
</script>