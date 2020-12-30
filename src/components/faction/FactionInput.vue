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
    <label for="insigniaUrl">insignia url</label>
    <input
      type="url"
      id="insigniaUrl"
      :value="insigniaUrl"
      @input="$emit('update:insigniaUrl', $event.target.value)"
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
    "name",
    "description",
    "insigniaUrl",
    "imageUrl",
  ],
};
</script>