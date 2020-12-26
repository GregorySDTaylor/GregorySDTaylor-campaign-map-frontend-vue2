<template>
  <div>
    <label for="name">name</label>
    <input
      type="text"
      id="name"
      :value="name"
      @input="$emit('update:name', $event.target.value)"
    />
    <label for="description">description</label>
    <input
      type="text"
      id="description"
      :value="description"
      @input="$emit('update:description', $event.target.value)"
    />
    <label for="imageUrl">image url</label>
    <input
      type="url"
      id="imageUrl"
      :value="imageUrl"
      @input="$emit('update:imageUrl', $event.target.value)"
    />
    <label for="mapUrl">map url</label>
    <input
      type="url"
      id="mapUrl"
      :value="mapUrl"
      @input="$emit('update:mapUrl', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: ["name", "description", "imageUrl", "mapUrl"],
};
</script>

<style>
</style>