<template>
  <v-dialog v-model="editControllingFactionDialog" max-width="1000px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab x-large class="ma-6" color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-flag</v-icon>
      </v-btn>
    </template>
    <edit-controlling-faction
      :locationUrl="location._links.self.href"
      @update:controllingFaction="$emit('update:controllingFaction')"
      @close="editControllingFactionDialog = false"
    />
  </v-dialog>
</template>
<script>
import EditControllingFaction from "@/components/location/EditControllingFaction.vue";
export default {
  components: { EditControllingFaction },
  name: "EditControllingFactionDialog",
  props: ["location"],
  data() {
    return {
      editControllingFactionDialog: false,
    };
  },
};
</script>