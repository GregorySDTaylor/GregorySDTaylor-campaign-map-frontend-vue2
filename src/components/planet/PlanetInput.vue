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
      label="diameter (kilometers)"
      type="number"
      id="diameterInKm"
      :value="diameterInKm"
      @input="$emit('update:diameterInKm', $event)"
    />
    <v-text-field
      class="ma-6"
      persistent-hint
      hint="valid url to an image that represents that planet flavor"
      label="image url"
      type="url"
      id="imageUrl"
      :value="imageUrl"
      @input="$emit('update:imageUrl', $event)"
    />
    <v-img class="ma-6" :src="imageUrl" />
    <v-text-field
      class="ma-6"
      persistent-hint
      hint="valid url to a planet map for placing locations"
      label="map url"
      type="url"
      id="mapUrl"
      :value="mapUrl"
      @input="$emit('update:mapUrl', $event)"
    />
    <v-img class="ma-6" :src="mapUrl" />
  </div>
</template>

<script>
export default {
  props: [
    "campaign",
    "name",
    "description",
    "diameterInKm",
    "imageUrl",
    "mapUrl",
  ],
};
</script>