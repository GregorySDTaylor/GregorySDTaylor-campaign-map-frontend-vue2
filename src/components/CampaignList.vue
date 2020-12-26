<template>
  <div>
    <h1>Campaigns</h1>
    <ul>
      <li v-for="campaign in campaigns" :key="campaign._links.self">
        <div>
          <img :src="campaign.imageUrl"/>
          <h2>{{campaign.name}}</h2>
          <p>{{campaign.description}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '@/campaignmap-restapi-axios.js';
export default {
  name: 'CampaignList',
  data() {
    return {
        campaigns: [
        ]
      };
  },
  mounted() {
    axios
      .get('/campaigns')
      .then(response => (
        this.campaigns = response.data._embedded.campaigns
      ))
  }
}
</script>

<style scoped>

</style>
