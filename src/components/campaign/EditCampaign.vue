<template>
  <v-container>
    <v-form @submit="updateCampaign">
      <h1 class="ma-6 text-h1">Edit Campaign</h1>
      <campaign-input v-bind.sync="campaign" />
      <v-btn class="ma-6" type="submit">update campaign</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import CampaignInput from "@/components/campaign/CampaignInput.vue";
import axios from "@/campaignmap-restapi-axios.js";
export default {
  name: "EditCampaign",
  components: {
    CampaignInput,
  },
  props: ["campaignUrl"],
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
    updateCampaign() {
      axios.patch(this.campaignUrl, this.campaign).then(() => {
        this.$router.push({
          name: "campaign",
          params: {
            campaignUrl: this.campaignUrl,
          },
        });
      });
    },
  },
  mounted() {
    axios
      .get(this.campaignUrl)
      .then((response) => (this.campaign = response.data));
  },
};
</script>