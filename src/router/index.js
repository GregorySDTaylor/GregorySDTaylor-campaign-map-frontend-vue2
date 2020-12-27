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
    path: "/campaign-edit/:campaignUrl",
    name: "campaign-edit",
    component: EditCampaign,
    props: true,
  },
  {
    path: "/campaign-new",
    name: "campaign-new",
    component: NewCampaign,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
