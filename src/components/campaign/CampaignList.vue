<template>
  <div>
    <h1>Campaigns</h1>
    <router-link to="/campaign-new">new campaign...</router-link>
    <ul>
      <li v-for="campaign in campaigns" :key="campaign._links.self.href">
        <campaign-list-item :campaign="campaign" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import CampaignListItem from "@/components/campaign/CampaignListItem.vue";
export default {
  name: "CampaignList",
  components: {
    CampaignListItem
  },
  data() {
    return {
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