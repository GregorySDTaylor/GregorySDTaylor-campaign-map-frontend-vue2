<template>
  <v-container>
    <v-row class="ma-6 justify-space-between">
      <h1 class="text-h1">Campaigns</h1>
      <v-btn right @click="$router.push('/campaign-new')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row justify="center">
      <campaign-list-item
        v-for="campaign in campaigns"
        :key="campaign._links.self.href"
        :campaign="campaign"
      />
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import CampaignListItem from "@/components/campaign/CampaignListItem.vue";
export default {
  name: "CampaignList",
  components: {
    CampaignListItem,
  },
  data() {
    return {
      campaigns: [],
    };
  },
  mounted() {
    axios
      .get("/campaigns")
      .then((response) => (this.campaigns = response.data._embedded.campaigns));
  },
};
</script>