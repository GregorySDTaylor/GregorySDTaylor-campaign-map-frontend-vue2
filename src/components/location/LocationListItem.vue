<template>
  <v-card
    @click="
      $router.push({
        name: 'location',
        params: {
          campaignUrl: campaign._links.self.href,
          planetUrl: planet._links.self.href,
          locationUrl: location._links.self.href,
        },
      })
    "
  >
    <v-img
      gradient="to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%,rgba(30,30,30,1) 80%, rgba(30,30,30,1) 100%"
      max-height="100"
      :src="location.imageUrl"
    >
      <v-row>
        <span>
          <h4 class="ma-6 text-h4">{{ location.name }}</h4>
        </span>
        <v-spacer />
        <edit-controlling-faction-dialog
          class="float-right"
          :location="location"
          :controllingFaction="controllingFaction"
          :campaignFactions="campaignFactions"
          @update:controllingFaction="
            getControllingFaction(location._links.controllingFaction.href)
          "
        />
      </v-row>
    </v-img>
    <v-card-text>
      {{ truncatedDescription }}
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "@/campaignmap-restapi-axios.js";
import EditControllingFactionDialog from "./EditControllingFactionDialog.vue";
const descriptionLimit = 160;
export default {
  components: { EditControllingFactionDialog },
  name: "LocationListItem",
  props: ["campaign", "campaignFactions", "planet", "location"],
  data() {
    return {
      controllingFaction: {
        _links: {
          self: {
            href: this.planetUrl,
          },
        },
      },
    };
  },
  computed: {
    truncatedDescription() {
      if (this.location.description.length < descriptionLimit) {
        return this.location.description;
      } else {
        return this.location.description.slice(0, descriptionLimit) + "...";
      }
    },
  },
  methods: {
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
  },
  mounted() {
    this.getControllingFaction(this.location._links.controllingFaction.href);
  },
};
</script>