<template>
  <v-container>
    <v-row class="my-16">
      <h2 class="ma-6 text-h2">Factions</h2>
      <v-spacer />
      <v-btn
        class="ma-6"
        color="primary"
        right
        @click="
          $router.push({
            name: 'faction-new',
            params: { campaignUrl: campaign._links.self.href },
          })
        "
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-col
        v-for="faction in factions"
        :key="faction._links.self.href"
        sm="12"
        md="6"
        lg="4"
        xl="3"
      >
        <faction-list-item
          :faction="faction"
          @factionDeleted="getFactions(campaign._links.factions.href)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import FactionListItem from "@/components/faction/FactionListItem.vue";
export default {
  components: {
    FactionListItem,
  },
  name: "FactionList",
  props: ["campaign"],
  data() {
    return {
      factions: [],
    };
  },
  methods: {
    getFactions() {
      axios
        .get(this.campaign._links.factions.href)
        .then((response) => (this.factions = response.data._embedded.factions));
    },
  },
  watch: {
    campaign() {
      this.getFactions();
    },
  },
};
</script>