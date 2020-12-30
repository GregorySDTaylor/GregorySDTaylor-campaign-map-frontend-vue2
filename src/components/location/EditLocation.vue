<template>
  <div>
    <div>
      <label for="controllingFaction">controlling faction</label>
      <select
        type="url"
        id="controllingFaction"
        v-model="controllingFaction._links.self.href"
      >
        <option value="">none</option>
        <option
          v-for="faction in factions"
          :key="faction._links.self.href"
          :value="faction._links.self.href"
        >
          {{ faction.name }}
        </option>
      </select>
      <button @click="updateOrDeleteControllingFaction">
        update controlling faction
      </button>
    </div>
    <form @submit="updateLocation">
      <h1>Edit Location</h1>
      <location-input
        v-bind.sync="location"
        :controllingFaction.sync="controllingFaction"
        :campaignFactions="factions"
      />
      <img :src="location.imageUrl" />
      <input type="submit" value="update location" />
    </form>
  </div>
</template>

<script>
import LocationInput from "@/components/location/LocationInput.vue";
import axios from "@/campaignmap-restapi-axios.js";
export default {
  name: "EditLocation",
  components: {
    LocationInput,
  },
  props: ["locationUrl"],
  data() {
    return {
      planet: null,
      campaign: null,
      factions: [],
      location: {
        name: null,
        description: null,
        imageUrl: null,
        latitude: null,
        longitude: null,
      },
      controllingFaction: {
        _links: {
          self: {
            href: "",
          },
        },
      },
    };
  },
  methods: {
    updateLocation() {
      axios.patch(this.locationUrl, this.location).then(() => {
        this.$router.push({
          name: "planet",
          params: {
            planetUrl: this.planet._links.self.href,
          },
        });
      });
    },
    updateOrDeleteControllingFaction() {
      if (this.controllingFaction._links.self.href == "") {
        this.deleteControllingFaction();
      } else {
        this.updateControllingFaction();
      }
    },
    deleteControllingFaction() {
      axios.delete(this.location._links.controllingFaction.href).then(() => {
        this.$router.push({
          name: "planet",
          params: {
            planetUrl: this.planet._links.self.href,
          },
        });
      });
    },
    updateControllingFaction() {
      axios
        .put(
          this.location._links.controllingFaction.href,
          this.controllingFaction._links.self.href,
          {
            headers: {
              "Content-Type": "text/uri-list",
            },
          }
        )
        .then(() => {
          this.$router.push({
            name: "planet",
            params: {
              planetUrl: this.planet._links.self.href,
            },
          });
        });
    },
    getPlanet(planetUrl) {
      axios.get(planetUrl).then((response) => {
        this.planet = response.data;
        this.getCampaign(response.data._links.campaign.href);
      });
    },
    getControllingFaction(controllingFactionUrl) {
      axios
        .get(controllingFactionUrl)
        .then((response) => {
          this.controllingFaction = response.data;
        })
        .catch(() => console.log("404 = no controlling faction"));
    },
    getCampaign(campaignUrl) {
      axios.get(campaignUrl).then((response) => {
        this.campaign = response.data;
        this.getFactions(response.data._links.factions.href);
      });
    },
    getFactions(factionsUrl) {
      axios.get(factionsUrl).then((response) => {
        this.factions = response.data._embedded.factions;
      });
    },
  },
  mounted() {
    axios.get(this.locationUrl).then((response) => {
      this.location = response.data;
      this.getPlanet(response.data._links.planet.href);
      this.getControllingFaction(response.data._links.controllingFaction.href);
    });
  },
};
</script>