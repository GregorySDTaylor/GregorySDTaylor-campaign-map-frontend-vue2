<template>
  <v-container color="secondary">
    <v-row class="my-16">
      <span>
        <h1 class="ma-6 text-h1">Campaigns</h1>
      </span>
      <v-spacer />
      <v-dialog v-model="newCampaignDialog" max-width="1000px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ma-6" color="primary" v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <new-campaign @close="newCampaignDialog = false" />
      </v-dialog>
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