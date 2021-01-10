<template>
  <v-card>
    <v-form @submit="updateOrDeleteControllingFaction">
      <v-card-title class="pa-6 text-h2">{{location.name}} Controlling Faction</v-card-title>
      <v-select
        v-model="selectedFaction"
        class="ma-6"
        :items="factionOptionsWithNull"
        item-text="name"
        item-value="_links.self.href"
      />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-6" color="primary" @click="$emit('close')">
          Close
        </v-btn>
        <v-btn
          class="ma-6"
          type="submit"
          color="primary"
          @click="$emit('close')"
        >
          update controlling faction
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";

const nullOptionText = "none";

export default {
  name: "EditControllingFaction",
  components: {},
  props: ["location", "controllingFaction", "campaignFactions"],
  data() {
    return {
      selectedFaction: this.controllingFaction._links.self.href,
    };
  },
  computed: {
    factionOptionsWithNull() {
      const nullOption = [
        {
          _links: {
            self: {
              href: null,
            },
          },
          name: nullOptionText,
        },
      ];
      const factionOptionsWithNull = nullOption.concat(this.campaignFactions);
      return factionOptionsWithNull;
    },
  },
  methods: {
    updateOrDeleteControllingFaction() {
      if (this.selectedFaction == null) {
        this.deleteControllingFaction();
      } else {
        this.updateControllingFaction();
      }
    },
    deleteControllingFaction() {
      axios.delete(this.location._links.controllingFaction.href).then(() => {
        this.$emit("update:controllingFaction");
      });
    },
    updateControllingFaction() {
      axios
        .put(
          this.location._links.controllingFaction.href,
          this.selectedFaction,
          {
            headers: {
              "Content-Type": "text/uri-list",
            },
          }
        )
        .then(() => {
          this.$emit("update:controllingFaction");
        });
    },
  },
};
</script>