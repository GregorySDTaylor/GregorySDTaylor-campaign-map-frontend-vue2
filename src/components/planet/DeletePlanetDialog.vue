<template>
  <v-dialog v-model="deletePlanetDialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mt-6 ml-6" color="warning" v-bind="attrs" v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Are you sure you want to delete {{ planet.name }}?
      </v-card-title>
      <v-card-text>there's no going back!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="deletePlanetDialog = false">
          cancel
        </v-btn>
        <v-btn
          color="warning"
          @click="
            deletePlanetDialog = false;
            deletePlanet();
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
  name: "DeletePlanetDialog",
  props: ["campaignUrl", "planet"],
  data() {
    return {
      deletePlanetDialog: false,
    };
  },
  methods: {
    deletePlanet() {
      axios
        .delete(this.planet._links.self.href)
        .then(() => this.$router.push(
          {
            name: "campaign",
            params: {
              campaignUrl: this.campaignUrl
            }
          }
          ));
    },
  },
};
</script>