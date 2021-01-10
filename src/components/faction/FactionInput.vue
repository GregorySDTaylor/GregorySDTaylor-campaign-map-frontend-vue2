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
      hint="valid url to an image used as this faction's insignia"
      label="insignia url"
      type="url"
      id="insigniaUrl"
      :value="insigniaUrl"
      @input="$emit('update:insigniaUrl', $event)"
    />
    <v-img class="ma-6" :src="insigniaUrl" />
    <v-text-field
      class="ma-6"
      persistent-hint
      hint="valid url to an image that represents that faction's flavor"
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
  props: ["name", "description", "insigniaUrl", "imageUrl"],
};
</script>