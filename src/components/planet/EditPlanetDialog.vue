<template>
  <v-dialog v-model="editPlanetDialog" max-width="1000px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-6" color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <edit-planet
      :planetUrl="planet._links.self.href"
      @update:planet="$emit('update:planet')"
      @close="editPlanetDialog = false"
    />
  </v-dialog>
</template>
<script>
import EditPlanet from "@/components/planet/EditPlanet.vue";
export default {
  components: { EditPlanet },
  name: "EditPlanetDialog",
  props: ["planet"],
  data() {
    return {
      editPlanetDialog: false,
    };
  },
};
</script>