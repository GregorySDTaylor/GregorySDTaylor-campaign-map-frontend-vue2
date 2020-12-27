<template>
  <div>
    <form @submit="updateCampaign">
      <h1>Edit Campaign</h1>
      <campaign-input v-bind.sync="campaign" />
      <img :src="campaign.imageUrl" />
      <img :src="campaign.mapUrl" />
      <input type="submit" value="update campaign" />
    </form>
  </div>
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
      axios.put(this.campaignUrl, this.campaign).then(() => {
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