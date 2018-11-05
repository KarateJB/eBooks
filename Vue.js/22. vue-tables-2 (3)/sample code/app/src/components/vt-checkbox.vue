<template>
  <div>
      <input v-model="data.selected" type="checkbox" @change="changed"/>
  </div>
</template>

<script>
// import {Event} from 'vue-tables-2';

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
