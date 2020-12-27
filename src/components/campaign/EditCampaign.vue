<template>
  <div>
    <form>
      <h1>Edit Campaign</h1>
      <campaign-input v-bind.sync="campaign" />
      <img :src="campaign.imageUrl" />
      <img :src="campaign.mapUrl" />
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
    createCampaign() {
      axios.post("/campaigns", this.campaign).then((response) => {
        console.log(response);
        this.$router.push({
          name: "campaign",
          params: {
            campaignUrl: response.data._links.self.href,
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