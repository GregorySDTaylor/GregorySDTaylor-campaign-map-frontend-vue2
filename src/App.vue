<template>
  <v-app>
    <v-app-bar hide-on-scroll app dense>
      <v-breadcrumbs :items="breadcrumbs" />
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
  computed: {
    breadcrumbs() {
      const breadcrumbs = [
        {
          to: {
            name: "campaign-list",
          },
          exact: true,
          text: "home",
        },
      ];
      const campaignUrl = this.$route.params.campaignUrl;
      if (typeof campaignUrl == "string") {
        breadcrumbs.push({
          to: {
            name: "campaign",
            params: {
              campaignUrl
            }
          },
          exact: true,
          text: "campaign",
        });
      }
      const factionUrl = this.$route.params.factionUrl;
      if (typeof factionUrl == "string") {
        breadcrumbs.push({
          to: {
            name: "faction",
            params: {
              campaignUrl,
              factionUrl
            }
          },
          exact: true,
          text: "faction",
        });
      }
      const planetUrl = this.$route.params.planetUrl;
      if (typeof planetUrl == "string") {
        breadcrumbs.push({
          to: {
            name: "planet",
            params: {
              campaignUrl,
              planetUrl
            }
          },
          exact: true,
          text: "planet",
        });
      }
      const locationUrl = this.$route.params.locationUrl;
      if (typeof locationUrl == "string") {
        breadcrumbs.push({
          to: {
            name: "location",
            params: {
              campaignUrl,
              planetUrl,
              locationUrl
            }
          },
          exact: true,
          text: "location",
        });
      }
      return breadcrumbs;
    },
  },
};
</script>
