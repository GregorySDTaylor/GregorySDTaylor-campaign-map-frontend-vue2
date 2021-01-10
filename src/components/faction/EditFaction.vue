<template>
  <v-card>
    <v-form @submit="updateFaction">
      <v-card-title class="ma-6 text-h1">Edit Faction</v-card-title>
      <faction-input class="ma-6" v-bind.sync="faction" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-6" color="primary" @click="$emit('close')">
          Close
        </v-btn>
        <v-btn
          class="ma-6"
          type="submit"
          color="primary"
          @click="$emit('close')"
          >update faction</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
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
        this.$emit("update:faction");
      });
    },
    getCampaign(campaignUrl) {
      axios
        .get(campaignUrl)
        .then((response) => (this.campaign = response.data));
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