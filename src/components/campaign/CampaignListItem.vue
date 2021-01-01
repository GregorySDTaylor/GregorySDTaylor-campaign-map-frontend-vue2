<template>
  <v-card
    max-width="400"
    class="ma-6"
    @click="
      $router.push({
        name: 'campaign',
        params: { campaignUrl: campaign._links.self.href },
      })
    "
  >
    <v-img :src="campaign.imageUrl" />
    <v-card-title>{{ campaign.name }}</v-card-title>
    <v-card-text>{{ campaign.description }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CampaignListItem",
  props: ["campaign"],
};
</script>