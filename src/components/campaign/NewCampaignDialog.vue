<template>
  <v-dialog v-model="newCampaignDialog" max-width="1000px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <new-campaign @close="newCampaignDialog = false" />
  </v-dialog>
</template>

<script>
import NewCampaign from "@/components/campaign/NewCampaign.vue";

export default {
  name: "NewCampaignDialog",
  components: { NewCampaign },
  data() {
    return {
      newCampaignDialog: false,
    };
  },
};
</script>