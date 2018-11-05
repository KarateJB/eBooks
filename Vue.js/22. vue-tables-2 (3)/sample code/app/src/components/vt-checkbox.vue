<template>
  <div>
      <input v-model="data.selected" type="checkbox" @change="changed"/>
  </div>
</template>

<script>

export default {
  name: "VtCheckbox",
  props: ["data", "index", "column"],
  data() {
    return {
    };
  },
  methods: {
    changed() {
      Event.$emit("vue-tables.checked", this.data);
    }
  }
};
</script>
