<template>
  <v-dialog v-model="newPlanetDialog" max-width="1000px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mt-6 ml-6" color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <new-planet :campaignUrl="campaignUrl" @close="newPlanetDialog = false" />
  </v-dialog>
</template>

<script>
import NewPlanet from "@/components/planet/NewPlanet.vue";

export default {
  name: "CampaignList",
  components: { NewPlanet },
  props: ["campaignUrl"],
  data() {
    return {
      newPlanetDialog: false,
    };
  },
};
</script>