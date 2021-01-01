<template>
  <div>
    <router-link
      :to="{
        name: 'campaign',
        params: { campaignUrl: campaign._links.self.href },
      }"
    >
      <div>
        <img :src="campaign.imageUrl" />
        <h2>{{ campaign.name }}</h2>
        <p>{{ campaign.description }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CampaignListItem",
  props: ["campaign"]
};
</script>