<template>
  <v-container>
    <v-row class="my-16">
      <span>
        <h1 class="ma-6 text-h1">{{ location.name }}</h1>
      </span>
      <edit-controlling-faction-dialog
        :location="location"
        :controllingFaction="controllingFaction"
        :campaignFactions="campaignFactions"
        @update:controllingFaction="
          getControllingFaction(location._links.controllingFaction.href)
        "
      />
      <v-spacer />
      <edit-location-dialog
        :location="location"
        :planet="planet"
        @update:location="getLocation(locationUrl)"
      />
      <delete-location-dialog :location="location" />
    </v-row>
    <v-row class="my-16">
      <v-col cols="12" class="hidden-lg-and-up">
        <v-img :src="location.imageUrl" />
      </v-col>
      <v-col sm="12" lg="8" xl="6">
        <p>{{ location.description }}</p>
      </v-col>
      <v-col lg="4" xl="6" class="hidden-md-and-down">
        <v-img :src="location.imageUrl" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import DeleteLocationDialog from "@/components/location/DeleteLocationDialog.vue";
import EditLocationDialog from "@/components/location/EditLocationDialog.vue";
import EditControllingFactionDialog from "@/components/location/EditControllingFactionDialog.vue";

export default {
  components: {
    DeleteLocationDialog,
    EditLocationDialog,
    EditControllingFactionDialog,
  },
  name: "Location",
  props: ["campaignUrl", "planetUrl", "locationUrl"],
  data() {
    return {
      location: {
        _links: {
          self: {
            href: this.locationUrl,
          },
          controllingFaction: {
            href: null,
          },
        },
      },
      controllingFaction: {
        _links: {
          self: {
            href: null,
          },
        },
      },
      campaign: {
        _links: {
          self: {
            href: this.campaignUrl,
          },
        },
      },
      planet: {
        _links: {
          self: {
            href: this.planetUrl,
          },
        },
      },
      campaignFactions: [],
    };
  },
  methods: {
    getLocation(locationUrl) {
      axios.get(locationUrl).then((response) => {
        this.location = response.data;
        this.getControllingFaction(
          response.data._links.controllingFaction.href
        );
      });
    },
    getControllingFaction(controllingFactionUrl) {
      axios
        .get(controllingFactionUrl)
        .then((response) => {
          this.controllingFaction = response.data;
        })
        .catch(() => {
          console.log("404 = no controlling faction");
          this.controllingFaction = {
            _links: {
              self: {
                href: null,
              },
            },
          };
        });
    },
    getCampaign(campaignUrl) {
      axios.get(campaignUrl).then((response) => {
        this.campaign = response.data;
        this.getCampaignFactions(response.data._links.factions.href);
      });
    },
    getPlanet(planetUrl) {
      axios.get(planetUrl).then((response) => {
        this.planet = response.data;
      });
    },
    getCampaignFactions(locationUrl) {
      axios.get(locationUrl).then((response) => {
        this.campaignFactions = response.data._embedded.factions;
      });
    },
  },
  mounted() {
    this.getLocation(this.locationUrl);
    this.getPlanet(this.planetUrl);
    this.getCampaign(this.campaignUrl);
  },
};
</script>