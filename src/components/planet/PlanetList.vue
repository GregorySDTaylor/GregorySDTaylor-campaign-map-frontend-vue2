<template>
  <v-container>
    <v-row>
      <v-card>
        <v-img
          gradient="to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%,rgba(30,30,30,1) 80%, rgba(30,30,30,1) 100%"
          max-height="400"
          position="top"
          :src="campaign.mapUrl"
        >
          <v-row class="ma-6">
            <h2 class="ma-4 text-h2">Planets</h2>
            <v-spacer />
            <v-btn
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
        <v-row>
          <v-col
            cols="6"
            v-for="planet in planets"
            :key="planet._links.self.href"
          >
            <planet-list-item :planet="planet" />
          </v-col>
        </v-row>
      </v-card>
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