<template>
  <v-card @click="
      $router.push({
        name: 'faction',
        params: {
          campaignUrl: campaign._links.self.href,
          factionUrl: faction._links.self.href,
        },
      })
    ">
    <v-img
      gradient="to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%,rgba(30,30,30,1) 80%, rgba(30,30,30,1) 100%"
      max-height="180"
      :src="faction.imageUrl"
    >
      <span>
        <h3 class="ma-6 text-h3">{{ faction.name }}</h3>
      </span>
    </v-img>
    <v-card-text>{{ truncatedDescription }}</v-card-text>
  </v-card>
</template>

<script>
const descriptionLimit = 160;
export default {
  name: "FactionListItem",
  props: ["campaign", "faction"],
  computed: {
    truncatedDescription() {
      if (this.faction.description.length < descriptionLimit) {
        return this.faction.description;
      } else {
        return this.faction.description.slice(0, descriptionLimit) + "...";
      }
    },
  },
};
</script>