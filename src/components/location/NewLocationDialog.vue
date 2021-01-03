<template>
  <v-dialog v-model="newLocationDialog" max-width="1000px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-6" color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <new-location :planetUrl="planetUrl" @close="newLocationDialog  = false" />
  </v-dialog>
</template>

<script>
import NewLocation from "@/components/location/NewLocation.vue";

export default {
  name: "NewLocationDialog",
  components: { NewLocation },
  props: ["planetUrl"],
  data() {
    return {
      newLocationDialog: false,
    };
  },
};
</script>