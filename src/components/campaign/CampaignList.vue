<template>
  <v-container color="secondary">
    <v-row class="my-16">
      <span>
        <h1 class="ma-6 text-h1">Campaigns</h1>
      </span>
      <v-spacer />
      <new-campaign-dialog/>
    </v-row>
    <v-row>
      <v-col
        v-for="campaign in campaigns"
        :key="campaign._links.self.href"
        sm="12"
        md="6"
        lg="4"
        xl="3"
      >
        <campaign-list-item :campaign="campaign" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import CampaignListItem from "@/components/campaign/CampaignListItem.vue";
import NewCampaignDialog from './NewCampaignDialog.vue';

export default {
  name: "CampaignList",
  components: { CampaignListItem, NewCampaignDialog },
  data() {
    return {
      newCampaignDialog: false,
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