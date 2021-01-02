<template>
  <v-dialog v-model="deleteCampaignDialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-6" color="warning" v-bind="attrs" v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Are you sure you want to delete {{ campaign.name }}?
      </v-card-title>
      <v-card-text>there's no going back!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="deleteCampaignDialog = false">
          cancel
        </v-btn>
        <v-btn
          color="warning"
          @click="
            deleteCampaignDialog = false;
            deleteCampaign();
          "
        >
          delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
export default {
  name: "Campaign",
  props: ["campaign"],
  data() {
    return {
      deleteCampaignDialog: false,
    };
  },
  methods: {
    deleteCampaign() {
      axios
        .delete(this.campaign._links.self.href)
        .then(() => this.$router.push({ name: "campaign-list" }));
    },
  },
};
</script>