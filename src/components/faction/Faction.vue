<template>
  <v-container>
    <v-row class="my-16">
      <span>
        <h1 class="text-h1">{{ faction.name }}</h1>
      </span>
      <v-spacer />
      <edit-faction-dialog
        :faction="faction"
        @update:faction="getFaction(factionUrl)"
      />
      <delete-faction-dialog :faction="faction" :campaignUrl="campaignUrl" />
    </v-row>
    <v-row class="my-16">
      <v-col cols="12" class="hidden-lg-and-up">
        <v-img :src="faction.imageUrl" />
      </v-col>
      <v-col sm="12" lg="8" xl="6">
        <p>{{ faction.description }}</p>
      </v-col>
      <v-col lg="4" xl="6" class="hidden-md-and-down">
        <v-img :src="faction.imageUrl" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import EditFactionDialog from "@/components/faction/EditFactionDialog.vue";
import DeleteFactionDialog from "@/components/faction/DeleteFactionDialog.vue";

export default {
  components: { EditFactionDialog, DeleteFactionDialog },
  name: "Faction",
  props: ["campaignUrl", "factionUrl"],
  data() {
    return {
      faction: {
        _links: {
          self: {
            href: this.planetUrl,
          },
        },
      },
    };
  },
  methods: {
    getFaction(factionUrl) {
      axios.get(factionUrl).then((response) => {
        this.faction = response.data;
      });
    },
  },
  mounted() {
    this.getFaction(this.factionUrl);
  },
};
</script>