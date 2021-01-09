<template>
  <div>
    <v-text-field
      class="ma-6"
      label="Name"
      type="text"
      id="name"
      :value="name"
      @input="$emit('update:name', $event)"
    />
    <v-textarea
      class="ma-6"
      label="description"
      type="text"
      id="description"
      :value="description"
      @input="$emit('update:description', $event)"
    />
    <v-text-field
      class="ma-6"
      label="latitude"
      hint="in decimal degrees with a precision of 4 decimal places"
      type="number"
      id="latitude"
      step="0.0001"
      :value="latitude"
      @input="$emit('update:latitude', $event)"
    />
    <v-text-field
      class="ma-6"
      label="longitude"
      hint="in decimal degrees with a precision of 4 decimal places"
      type="number"
      id="longitude"
      step="0.0001"
      :value="longitude"
      @input="$emit('update:longitude', $event)"
    />
    <v-img class="ma-6" :src="planet.mapUrl" @click="setLocation">
      <v-avatar
        v-if="latitude && longitude"
        class="float-left"
        color="primary"
        :style="{ left: cssPosition.x, top: cssPosition.y }"
      >
        <v-icon large>mdi-map-marker</v-icon>
      </v-avatar>
    </v-img>
    <v-text-field
      class="ma-6"
      persistent-hint
      hint="valid url to an image that represents the location's flavor"
      label="image url"
      type="url"
      id="imageUrl"
      :value="imageUrl"
      @input="$emit('update:imageUrl', $event)"
    />
    <v-img class="ma-6" :src="imageUrl" />
  </div>
</template>

<script>
import numeral from "numeral";
export default {
  props: [
    "planet",
    "controllingFaction",
    "name",
    "description",
    "imageUrl",
    "latitude",
    "longitude",
  ],
  methods: {
    setLocation(clickEvent) {
      const boundingClientRect = clickEvent.target.getBoundingClientRect();
      // origin is (0, 0) at top left of bounding client rectangle
      const relativeX =
        (clickEvent.clientX - boundingClientRect.x) / boundingClientRect.width;
      const newLongitude = numeral(360 * relativeX - 180).format("0.0000");
      this.$emit("update:longitude", newLongitude);
      const relativeY =
        (clickEvent.clientY - boundingClientRect.y) / boundingClientRect.height;
      const newLatitdue = numeral(90 - 180 * relativeY).format("0.0000");
      this.$emit("update:latitude", newLatitdue);
    },
  },
  computed: {
    relativeCoordinates() {
      const longitudeFloat = parseFloat(this.longitude);
      const relativeX = (180 + longitudeFloat) / 360;
      const latitudeFloat = parseFloat(this.latitude);
      const relativeY = (90 - latitudeFloat) / 180;
      return {
        x: numeral(relativeX).format("0.0000%"),
        y: numeral(relativeY).format("0.0000%"),
      };
    },
    cssPosition() {
      return {
        x: "calc(" + this.relativeCoordinates.x + " - 24px)",
        y: "calc(" + this.relativeCoordinates.y + " - 24px)",
      };
    },
  },
};
</script>