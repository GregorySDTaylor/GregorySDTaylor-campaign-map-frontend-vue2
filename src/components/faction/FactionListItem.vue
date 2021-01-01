<template>
  <div>
    <router-link
      :to="{
        name: 'faction-edit',
        params: { factionUrl: faction._links.self.href },
      }"
    >
      edit
    </router-link>
    <button @click="deleteFaction(faction)">delete</button>
    <img :src="faction.insigniaUrl" />
    <img :src="faction.imageUrl" />
    <h2>{{ faction.name }}</h2>
    <p>{{ faction.description }}</p>
  </div>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
export default {
  name: "FactionListItem",
  props: ["faction"],
  methods: {
    deleteFaction(faction) {
      axios
        .delete(faction._links.self.href)
        .then(() => this.$emit("factionDeleted", faction));
    },
  },
};
</script>