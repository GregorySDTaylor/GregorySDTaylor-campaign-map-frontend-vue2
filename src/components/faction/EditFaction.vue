<template>
  <div>
    <form @submit="updateFaction">
      <h1>Edit Faction</h1>
      <faction-input v-bind.sync="faction" />
      <img :src="faction.insigniaUrl" />
      <img :src="faction.imageUrl" />
      <input type="submit" value="update faction" />
    </form>
  </div>
</template>

<script>
import FactionInput from "@/components/faction/FactionInput.vue";
import axios from "@/campaignmap-restapi-axios.js";
export default {
  name: "EditFaction",
  components: {
    FactionInput,
  },
  props: ["factionUrl"],
  data() {
    return {
      campaign: null,
      faction: {
        campaign: null,
        name: null,
        description: null,
        insigniaUrl: null,
        imageUrl: null,
      },
    };
  },
  methods: {
    updateFaction() {
      axios.patch(this.factionUrl, this.faction).then(() => {
        this.$router.push({
          name: "campaign",
          params: {
            campaignUrl: this.campaign._links.self.href,
          },
        });
      });
    },
    getCampaign(campaignUrl) {
      axios.get(campaignUrl).then((response) => (this.campaign = response.data));
    },
  },
  mounted() {
    axios.get(this.factionUrl).then((response) => {
      this.faction = response.data;
      this.getCampaign(response.data._links.campaign.href);
    });
  },
};
</script>