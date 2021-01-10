<template>
  <v-card>
    <v-form @submit="createFaction">
      <v-card-title class="ma-6 text-h1">New Faction</v-card-title>
      <faction-input class="ma-6" v-bind.sync="faction" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-6" color="primary" @click="$emit('close')">
          Close
        </v-btn>
        <v-btn
          class="ma-6"
          type="submit"
          color="primary"
          >create new faction</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import FactionInput from "@/components/faction/FactionInput.vue";
import axios from "@/campaignmap-restapi-axios.js";
export default {
  components: {
    FactionInput,
  },
  name: "NewFaction",
  props: ["campaignUrl"],
  data() {
    return {
      faction: {
        campaign: this.campaignUrl,
        name: null,
        description: null,
        insigniaUrl: null,
        imageUrl: null,
      },
    };
  },
  methods: {
    createFaction() {
      axios.post("/factions", this.faction).then((response) => {
        this.$router.push({
          name: "faction",
          params: {
            campaignUrl: this.campaignUrl,
            factionUrl: response.data._links.self.href,
          },
        });
      });
    },
  },
};
</script>