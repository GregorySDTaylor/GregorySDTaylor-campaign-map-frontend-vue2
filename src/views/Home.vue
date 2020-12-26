<template>
  <div class="home">
    <campaign-list/>
  </div>
</template>

<script>
import CampaignList from '../components/CampaignList.vue'

export default {
  name: 'Home',
  components: {
    CampaignList
  }
}
</script>
