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
};
</script>