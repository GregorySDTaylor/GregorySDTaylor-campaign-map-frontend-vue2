<template>
  <div>
    <label for="controllingFaction">controlling faction</label>
    <input
      type="url"
      id="controllingFaction"
      :value="controllingFaction"
      @input="$emit('update:controllingFaction', $event.target.value)"
    />
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
    <label for="latitude">latitude</label>
    <input
      type="number"
      id="latitude"
      step=0.0001
      :value="latitude"
      @input="$emit('update:latitude', $event.target.value)"
    />
    <label for="longitude">longitude</label>
    <input
      type="number"
      id="longitude"
      step=0.0001
      :value="longitude"
      @input="$emit('update:longitude', $event.target.value)"
    />
    <label for="imageUrl">image url</label>
    <input
      type="url"
      id="imageUrl"
      :value="imageUrl"
      @input="$emit('update:imageUrl', $event.target.value)"
    />
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