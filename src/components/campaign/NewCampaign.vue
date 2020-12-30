<template>
  <div>
    <form @submit="createCampaign">
      <h1>New Campaign</h1>
      <campaign-input v-bind.sync="campaign" />
      <img :src="campaign.imageUrl" />
      <img :src="campaign.mapUrl" />
      <input type="submit" value="create new campaign" />
    </form>
  </div>
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