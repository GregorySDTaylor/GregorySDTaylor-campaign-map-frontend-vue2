import Vue from "vue";
import VueRouter from "vue-router";
import CampaignList from "@/components/campaign/CampaignList.vue";
import Campaign from "@/components/campaign/Campaign.vue";
import EditPlanet from "@/components/planet/EditPlanet.vue"
import NewPlanet from "@/components/planet/NewPlanet.vue"
import Planet from "@/components/planet/Planet.vue"
import EditLocation from "@/components/location/EditLocation.vue"
import NewLocation from "@/components/location/NewLocation.vue"
import Location from "@/components/location/Location.vue"
import EditFaction from "@/components/faction/EditFaction.vue"
import NewFaction from "@/components/faction/NewFaction.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "campaign-list",
    component: CampaignList,
  },
  {
    path: "/campaign/:campaignUrl",
    name: "campaign",
    component: Campaign,
    props: true,
  },
  {
    path: "/planet/:planetUrl",
    name: "planet",
    component: Planet,
    props: true,
  },
  {
    path: "/planet-edit/:planetUrl",
    name: "planet-edit",
    component: EditPlanet,
    props: true,
  },
  {
    path: "/campaign/:campaignUrl/planet-new",
    name: "planet-new",
    component: NewPlanet,
    props: true,
  },
  {
    path: "/location-edit/:locationUrl",
    name: "location-edit",
    component: EditLocation,
    props: true,
  },
  {
    path: "/planet/:planetUrl/location-new",
    name: "location-new",
    component: NewLocation,
    props: true,
  },
  {
    path: "/faction-edit/:factionUrl",
    name: "faction-edit",
    component: EditFaction,
    props: true,
  },
  {
    path: "/campaign/:campaignUrl/faction-new",
    name: "faction-new",
    component: NewFaction,
    props: true,
  },
  {
    path: "/location/:locationUrl",
    name: "location",
    component: Location,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
