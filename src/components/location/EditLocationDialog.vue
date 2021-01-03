<template>
  <v-dialog v-model="editLocationDialog" max-width="1000px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-6" color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <edit-location
      :locationUrl="location._links.self.href"
      @update:location="$emit('update:location')"
      @close="editLocationDialog = false"
    />
  </v-dialog>
</template>
<script>
import EditLocation from "@/components/location/EditLocation.vue";
export default {
  components: { EditLocation },
  name: "EditLocationDialog",
  props: ["location"],
  data() {
    return {
      editLocationDialog: false,
    };
  },
};
</script>