<template>
  <div>
    <router-link
      :to="{
        name: 'location-edit',
        params: { locationUrl: location._links.self.href },
      }"
    >
      edit
    </router-link>
    <button @click="deleteLocation(location)">delete</button>
    <img :src="location.imageUrl" />
    <h2>{{ location.name }}</h2>
    <p>{{ location.description }}</p>
    <p>location: {{ location.latitude }} {{ location.longitude }}</p>
  </div>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
export default {
  name: "LocationListItem",
  props: ["location"],
  methods: {
    deleteLocation(location) {
      axios.delete(location._links.self.href).then(() => {
        this.$emit("locationDeleted", location)
      });
    },
  },
};
</script>