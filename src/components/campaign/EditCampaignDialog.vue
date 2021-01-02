<template>
  <v-dialog v-model="editCampaignDialog" max-width="1000px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mx-6" color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <edit-campaign
      :campaignUrl="campaign._links.self.href"
      @update:campaign="$emit('update:campaign')"
      @close="editCampaignDialog = false"
    />
  </v-dialog>
  <!-- @update:campaign="getCampaign(campaignUrl)" -->
</template>
<script>
import EditCampaign from "@/components/campaign/EditCampaign.vue";
export default {
  components: { EditCampaign },
  name: "EditCampaignDialog",
  props: ["campaign"],
  data() {
    return {
      editCampaignDialog: false,
    };
  },
};
</script>