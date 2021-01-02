<template>
  <v-container>
    <v-row class="ma-6 justify-space-between">
      <h1 class="text-h1">Campaigns</h1>
      <v-spacer />
      <v-dialog v-model="newCampaignDialog" max-width="1000px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-6" color="primary" v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <new-campaign @close="newCampaignDialog = false" />
      </v-dialog>
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
import NewCampaign from "@/components/campaign/NewCampaign.vue";

export default {
  name: "CampaignList",
  components: { CampaignListItem, NewCampaign },
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