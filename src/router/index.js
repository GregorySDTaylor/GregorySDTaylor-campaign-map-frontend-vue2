import Vue from "vue";
import VueRouter from "vue-router";
import CampaignList from "@/components/campaign/CampaignList.vue";
import Campaign from "@/components/campaign/Campaign.vue";
import Planet from "@/components/planet/Planet.vue";
import Location from "@/components/location/Location.vue";
import EditFaction from "@/components/faction/EditFaction.vue";
import Faction from "@/components/faction/Faction.vue";
import NewFaction from "@/components/faction/NewFaction.vue";

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
    path: "/campaign/:campaignUrl/planet/:planetUrl",
    name: "planet",
    component: Planet,
    props: true,
  },
  {
    path: "/campaign/:campaignUrl/faction/:factionUrl",
    name: "faction",
    component: Faction,
    props: true,
  },
  {
    path: "/campaign/:campaignUrl/planet/:planetUrl/location/:locationUrl",
    name: "location",
    component: Location,
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
];

const router = new VueRouter({
  routes,
});

export default router;
