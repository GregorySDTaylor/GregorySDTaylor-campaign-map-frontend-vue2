<template>
  <v-dialog v-model="deleteFactionDialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-6" color="warning" v-bind="attrs" v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Are you sure you want to delete {{ faction.name }}?
      </v-card-title>
      <v-card-text>there's no going back!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="deleteFactionDialog = false">
          cancel
        </v-btn>
        <v-btn
          color="warning"
          @click="
            deleteFactionDialog = false;
            deleteFaction();
          "
        >
          delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
export default {
  name: "DeleteFactionDialog",
  props: ["faction", "campaignUrl"],
  data() {
    return {
      deleteFactionDialog: false,
    };
  },
  methods: {
    deleteFaction() {
      axios
        .delete(this.faction._links.self.href)
        .then(() =>
          this.$router.push({
            name: "campaign",
            params: { campaignUrl: this.campaignUrl },
          })
        );
    },
  },
};
</script>