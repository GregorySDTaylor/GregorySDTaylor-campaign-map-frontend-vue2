<template>
  <v-btn
    v-if="location.latitude && location.longitude"
    fab
    class="float-left"
    :style="{
      left: cssPosition.x,
      top: cssPosition.y,
    }"
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
    <v-avatar>
      <v-img :src="location.imageUrl" />
    </v-avatar>
  </v-btn>
</template>

<script>
import numeral from "numeral";

export default {
  name: "LocationMapIcon",
  props: ["campaign", "planet", "location"],
  computed: {
    cssPosition() {
      const longitudeFloat = parseFloat(this.location.longitude);
      const relativeX = (180 + longitudeFloat) / 360;
      const latitudeFloat = parseFloat(this.location.latitude);
      const relativeY = (90 - latitudeFloat) / 180;
      const cssPosition = {
        x: "calc(" + numeral(relativeX).format("0.0000%") + " - 28px)",
        y: "calc(" + numeral(relativeY).format("0.0000%") + " - 28px)",
      };
      console.log(JSON.stringify(cssPosition));
      return cssPosition;
    },
  },
};
</script>