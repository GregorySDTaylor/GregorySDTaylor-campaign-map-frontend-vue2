<template>
  <v-app>
    <v-app-bar hide-on-scroll app dense>
      <v-breadcrumbs :items="items" />
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      items: [
        {
          to: "/",
          text: "todo",
        },
        {
          to: "/",
          text: "breadcrumbs",
        },
      ],
    };
  },
};
</script>
