import Vue from "vue";
import VueRouter from "vue-router";
import CampaignList from "@/components/campaign/CampaignList.vue";
import Campaign from "@/components/campaign/Campaign.vue";
import EditCampaign from "@/components/campaign/EditCampaign.vue";
import NewCampaign from "@/components/campaign/NewCampaign.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: CampaignList,
  },
  {
    path: "/campaign/:campaignUrl",
    name: "campaign",
    component: Campaign,
    props: true,
  },
  {
    path: "/edit-campaign/:campaignUrl",
    name: "edit-campaign",
    component: EditCampaign,
    props: true,
  },
  {
    path: "/new-campaign",
    name: "new-campaign",
    component: NewCampaign,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
