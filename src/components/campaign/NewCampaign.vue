<template>
  <v-container>
    <v-form @submit="createCampaign">
      <h1 class="ma-6 text-h1">New Campaign</h1>
      <campaign-input v-bind.sync="campaign" />
      <v-btn class="ma-6" type="submit">create new campaign</v-btn>
    </v-form>
  </v-container>
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