<template>
  <div>
    <router-link
      :to="{
        name: 'edit-campaign',
        params: { campaignUrl: campaign._links.self.href },
      }"
    >
      edit
    </router-link>
    <img :src="campaign.imageUrl" />
    <img :src="campaign.mapUrl" />
    <h2>{{ campaign.name }}</h2>
    <p>{{ campaign.description }}</p>
  </div>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
export default {
  name: "Campaign",
  props: ["campaignUrl"],
  data() {
    return {
      campaign: {
        _links: {
          self: {
            href: "not yet defined"
          }
        }
      },
      planets: [],
    };
  },
  mounted() {
    axios
      .get(this.campaignUrl)
      .then((response) => (this.campaign = response.data));
  },
};
</script>

<style scoped>
</style>