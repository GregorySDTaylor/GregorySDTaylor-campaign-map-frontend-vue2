<template>
  <v-dialog v-model="deleteLocationDialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-6" color="warning" v-bind="attrs" v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Are you sure you want to delete {{ location.name }}?
      </v-card-title>
      <v-card-text>there's no going back!</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="deleteLocationDialog = false">
          cancel
        </v-btn>
        <v-btn
          color="warning"
          @click="
            deleteLocationDialog = false;
            deleteLocation();
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
  name: "DeleteLocationDialog",
  props: ["location", "planetUrl" ],
  data() {
    return {
      deleteLocationDialog: false,
    };
  },
  methods: {
    deleteLocation() {
      axios
        .delete(this.location._links.self.href)
        .then(() => this.$router.push(
          {
            name: "planet",
            params: {
              planetUrl: this.planetUrl
            }
          }
          ));
    },
  },
};
</script>