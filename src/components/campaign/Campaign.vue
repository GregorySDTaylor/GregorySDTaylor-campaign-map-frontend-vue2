<template>
  <v-container>
    <v-row class="ma-6">
      <span>
        <h1 class="text-h1">{{ campaign.name }}</h1>
      </span>
      <v-spacer />
      <v-dialog v-model="editCampaignDialog" max-width="1000px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-6" color="primary" v-bind="attrs" v-on="on">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <edit-campaign
          :campaignUrl="campaign._links.self.href"
          @update:campaign="getCampaign(campaignUrl)"
          @close="editCampaignDialog = false"
        />
      </v-dialog>
      <v-dialog v-model="deleteCampaignDialog" max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="warning" v-bind="attrs" v-on="on">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            Are you sure you want to delete {{ campaign.name }}?
          </v-card-title>
          <v-card-text>there's no going back!</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="deleteCampaignDialog = false">
              cancel
            </v-btn>
            <v-btn
              color="warning"
              @click="
                deleteCampaignDialog = false;
                deleteCampaign();
              "
            >
              delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row class="ma-6">
      <v-col>
        <p>{{ campaign.description }}</p>
      </v-col>
      <v-col cols="4">
        <v-img :src="campaign.imageUrl" />
      </v-col>
    </v-row>
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
    <v-card>
      <v-row class="ma-6">
        <h2 class="ma-4 text-h2">Factions</h2>
        <v-spacer />
        <v-btn
          class="ma-6"
          color="primary"
          right
          @click="
            $router.push({
              name: 'faction-new',
              params: { campaignUrl: campaign._links.self.href },
            })
          "
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-row>
      <v-row>
        <v-col
          v-for="faction in factions"
          :key="faction._links.self.href"
          cols="6"
        >
          <faction-list-item
            :faction="faction"
            @factionDeleted="getFactions(campaign._links.factions.href)"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import PlanetListItem from "@/components/planet/PlanetListItem.vue";
import FactionListItem from "@/components/faction/FactionListItem.vue";
import EditCampaign from "@/components/campaign/EditCampaign.vue";
export default {
  components: { PlanetListItem, FactionListItem, EditCampaign },
  name: "Campaign",
  props: ["campaignUrl"],
  data() {
    return {
      editCampaignDialog: false,
      deleteCampaignDialog: false,
      campaign: {
        _links: {
          self: {
            href: "not yet defined",
          },
        },
      },
      planets: [],
      factions: [],
    };
  },
  methods: {
    deleteCampaign() {
      axios
        .delete(this.campaignUrl)
        .then(() => this.$router.push({ name: "campaign-list" }));
    },
    getCampaign(campaignUrl) {
      axios.get(campaignUrl).then((response) => {
        this.campaign = response.data;
        this.getPlanets(response.data._links.planets.href);
        this.getFactions(response.data._links.factions.href);
      });
    },
    getPlanets(planetsUrl) {
      axios
        .get(planetsUrl)
        .then((response) => (this.planets = response.data._embedded.planets));
    },
    getFactions(factionsUrl) {
      axios
        .get(factionsUrl)
        .then((response) => (this.factions = response.data._embedded.factions));
    },
  },
  mounted() {
    this.getCampaign(this.campaignUrl);
  },
};
</script>