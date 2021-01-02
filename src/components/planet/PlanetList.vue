<template>
  <v-container>
    <v-row class="my-16">
      <v-img
        gradient="to left, rgba(0,0,0,0) 0%, rgba(18,18,18,1) 80%"
        max-height="300"
        position="top"
        :src="campaign.mapUrl"
      >
        <v-row>
          <span>
            <h2 class="ma-6 text-h2">Planets</h2>
          </span>
          <v-spacer />
          <v-btn
            class="ma-6"
            color="primary"
            right
            @click="
              $router.push({
                name: 'planet-new',
                params: { campaignUrl: campaign._links.self.href },
              })
            "
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-row>
      </v-img>
    </v-row>
    <v-row class="my-16">
      <v-col
        v-for="planet in planets"
        :key="planet._links.self.href"
        sm="12"
        md="6"
        lg="4"
        xl="3"
      >
        <planet-list-item :planet="planet" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import PlanetListItem from "@/components/planet/PlanetListItem.vue";
export default {
  components: {
    PlanetListItem,
  },
  name: "PlanetList",
  props: ["campaign"],
  data() {
    return {
      planets: [],
    };
  },
  methods: {
    getPlanets() {
      axios
        .get(this.campaign._links.planets.href)
        .then((response) => (this.planets = response.data._embedded.planets));
    },
  },
  watch: {
    campaign() {
      this.getPlanets();
    },
  },
};
</script>