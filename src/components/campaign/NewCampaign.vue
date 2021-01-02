<template>
  <v-card>
    <v-form @submit="createCampaign">
      <v-card-title class="ma-6 text-h1">New Campaign</v-card-title>
      <campaign-input class="ma-6" v-bind.sync="campaign" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-6" color="primary" @click="$emit('close')">
          Close
        </v-btn>
        <v-btn
          class="ma-6"
          type="submit"
          color="primary"
          >create new campaign</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import CampaignInput from "@/components/campaign/CampaignInput.vue";
import axios from "@/campaignmap-restapi-axios.js";
export default {
  components: {
    CampaignInput,
  },
  name: "NewCampaign",
  data() {
    return {
      campaign: {
        name: null,
        description: null,
        imageUrl: null,
        mapUrl: null,
      },
    };
  },
  methods: {
    createCampaign() {
      axios.post("/campaigns", this.campaign).then((response) => {
        this.$router.push({
          name: "campaign",
          params: {
            campaignUrl: response.data._links.self.href,
          },
        });
      });
    },
  },
};
</script>