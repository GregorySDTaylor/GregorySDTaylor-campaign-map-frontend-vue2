<template>
  <v-dialog v-model="newFactionDialog" max-width="1000px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <new-faction :campaignUrl="campaignUrl" @close="newFactionDialog = false" />
  </v-dialog>
</template>

<script>
import NewFaction from "@/components/faction/NewFaction.vue";

export default {
  name: "NewFactionDialog",
  components: { NewFaction },
  props: ["campaignUrl"],
  data() {
    return {
      newFactionDialog: false,
    };
  },
};
</script>