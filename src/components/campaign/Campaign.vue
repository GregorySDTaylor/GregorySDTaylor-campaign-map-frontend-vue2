<template>
  <div>
    <router-link
      :to="{
        name: 'campaign-edit',
        params: { campaignUrl: campaign._links.self.href },
      }"
    >
      edit
    </router-link>
    <button @click="deleteCampaign">delete</button>
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
  methods: {
    deleteCampaign() {
      axios
        .delete(this.campaignUrl)
        .then(() => (this.$router.push({name: "campaign-list"})));
    }
  },
  mounted() {
    axios
      .get(this.campaignUrl)
      .then((response) => (this.campaign = response.data));
  },
};
</script>