<template>
  <v-container>
    <v-row class="my-16">
      <span>
        <h1 class="ma-6 text-h1">{{ campaign.name }}</h1>
      </span>
      <v-spacer />
      <edit-campaign-dialog
        :campaign="campaign"
        @update:campaign="getCampaign(campaignUrl)"
      />
      <delete-campaign-dialog :campaign="campaign"/>
    </v-row>
    <v-row class="my-16">
      <v-col cols=12 class="hidden-lg-and-up">
        <v-img :src="campaign.imageUrl" />
      </v-col>
      <v-col sm=12 lg=8 xl=6>
        <p>{{ campaign.description }}</p>
      </v-col>
      <v-col lg=4 xl=6 class="hidden-md-and-down">
        <v-img :src="campaign.imageUrl" />
      </v-col>
    </v-row>
    <planet-list :campaign="campaign" ref="planets" />
    <faction-list :campaign="campaign" ref="factions" />
  </v-container>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import EditCampaignDialog from "@/components/campaign/EditCampaignDialog.vue";
import DeleteCampaignDialog from "@/components/campaign/DeleteCampaignDialog.vue";
import PlanetList from '@/components/planet/PlanetList.vue';
import FactionList from '@/components/faction/FactionList.vue';
export default {
  components: {
    FactionList,
    EditCampaignDialog,
    DeleteCampaignDialog,
    PlanetList,
  },
  name: "Campaign",
  props: ["campaignUrl"],
  data() {
    return {
      campaign: {
        _links: {
          self: {
            href: null,
          },
          planets: {
            href: null,
          },
          factions: {
            href: null,
          },
        },
      },
      factions: [],
    };
  },
  methods: {
    getCampaign(campaignUrl) {
      axios.get(campaignUrl).then((response) => {
        this.campaign = response.data;
      });
    },
  },
  mounted() {
    this.getCampaign(this.campaignUrl);
  },
};
</script>