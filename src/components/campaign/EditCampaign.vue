<template>
  <v-card>
    <v-form @submit="updateCampaign">
      <v-card-title class="pa-6 text-h1">Edit Campaign</v-card-title>
      <campaign-input class="pa-6" v-bind.sync="campaign" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-6" color="primary" @click="$emit('close')">
          Close
        </v-btn>
        <v-btn class="ma-6" type="submit" color="primary" @click="$emit('close')">
          Save
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
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
        this.$emit("update:campaign");
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