<template>
  <v-card color="rgba(18,18,18,1)" class="ma-6">
    <v-img
      gradient="to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%,rgba(30,30,30,1) 80%, rgba(30,30,30,1) 100%"
      max-height="180"
      :src="faction.imageUrl"
    >
      <v-row>
        <v-col cols="9">
          <h3 class="ma-6 text-h3">{{ faction.name }}</h3>
        </v-col>
        <v-col cols="3">
          <v-btn
            color="primary"
            class="ma-6"
            right
            @click="
              $router.push({
                name: 'faction-edit',
                params: { factionUrl: faction._links.self.href },
              })
            "
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            class="ma-6"
            right
            @click="deleteFaction(faction)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-img>
    <p class="ma-6">{{ truncatedDescription }}</p>
  </v-card>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
const descriptionLimit = 160;
export default {
  name: "FactionListItem",
  props: ["faction"],
  methods: {
    deleteFaction(faction) {
      axios
        .delete(faction._links.self.href)
        .then(() => this.$emit("factionDeleted", faction));
    },
  },
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