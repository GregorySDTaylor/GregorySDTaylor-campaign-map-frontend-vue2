<template>
  <v-container>
    <v-row class="ma-6">
      <span>
        <h1 class="text-h1">{{ campaign.name }}</h1>
      </span>
      <v-spacer />
      <edit-campaign-dialog
        :campaign="campaign"
        @update:campaign="getCampaign(campaignUrl)"
      />
      <delete-campaign-dialog :campaign="campaign"/>
    </v-row>
    <v-row class="ma-6">
      <v-col>
        <p>{{ campaign.description }}</p>
      </v-col>
      <v-col cols="4">
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