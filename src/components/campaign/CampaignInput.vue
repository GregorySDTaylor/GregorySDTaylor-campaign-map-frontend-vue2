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
      persistent-hint
      hint="valid url to an image that represents that campaign flavor"
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
      hint="valid url to a system map for locating planets"
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
  props: ["name", "description", "imageUrl", "mapUrl"],
};
</script>