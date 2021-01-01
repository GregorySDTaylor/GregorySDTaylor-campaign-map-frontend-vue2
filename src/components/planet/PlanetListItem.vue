<template>
  <div>
    <router-link
      :to="{
        name: 'planet',
        params: { planetUrl: planet._links.self.href },
      }"
    >
      <div>
        <img :src="planet.imageUrl" />
        <h2>{{ planet.name }}</h2>
        <p>{{ planet.description }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PlanetListItem",
  props: ["planet"],
};
</script>