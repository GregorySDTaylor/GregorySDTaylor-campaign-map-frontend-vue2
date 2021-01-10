<template>
  <v-card
    @click="
      $router.push({
        name: 'campaign',
        params: { campaignUrl: campaign._links.self.href },
      })
    "
  >
    <v-img :src="campaign.imageUrl" />
    <v-card-title>{{ campaign.name }}</v-card-title>
    <v-card-text>{{ truncatedDescription }}</v-card-text>
  </v-card>
</template>

<script>
const descriptionLimit = 160;
export default {
  name: "CampaignListItem",
  props: ["campaign"],
  computed: {
    truncatedDescription() {
      if (this.campaign.description.length < descriptionLimit) {
        return this.campaign.description;
      } else { 
        return this.campaign.description.slice(0, descriptionLimit) + '...';
      }
    }
  }
};
</script>