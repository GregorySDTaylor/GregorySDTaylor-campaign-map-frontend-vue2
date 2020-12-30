<template>
  <div>
    <form @submit="createFaction">
      <h1>New Faction</h1>
      <faction-input v-bind.sync="faction" />
      <img :src="faction.insigniaUrl" />
      <img :src="faction.imageUrl" />
      <input type="submit" value="create new faction" />
    </form>
  </div>
</template>

<script>
import FactionInput from "@/components/faction/FactionInput.vue";
import axios from "@/campaignmap-restapi-axios.js";
export default {
  components: {
    FactionInput,
  },
  name: "NewFaction",
  props: ["campaignUrl"],
  data() {
    return {
      faction: {
        campaign: this.campaignUrl,
        name: null,
        description: null,
        insigniaUrl: null,
        imageUrl: null,
      },
    };
  },
  methods: {
    createFaction() {
      axios.post("/factions", this.faction).then(() => {
        this.$router.push({
          name: "campaign",
          params: {
            campaignUrl: this.campaignUrl,
          },
        });
      });
    },
  },
};
</script>