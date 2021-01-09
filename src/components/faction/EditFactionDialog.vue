<template>
  <v-dialog v-model="editFactionDialog" max-width="1000px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-6" color="primary" v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <edit-faction
      :factionUrl="faction._links.self.href"
      @update:faction="$emit('update:faction')"
      @close="editFactionDialog = false"
    />
  </v-dialog>
</template>
<script>
import EditFaction from "@/components/faction/EditFaction.vue";
export default {
  components: { EditFaction },
  name: "EditFactionDialog",
  props: ["faction"],
  data() {
    return {
      editFactionDialog: false,
    };
  },
};
</script>