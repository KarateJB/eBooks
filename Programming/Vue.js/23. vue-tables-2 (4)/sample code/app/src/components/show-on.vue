<template>
    <ul class="list-group">
        <li class="list-group-item"  v-for="ep in data.showOn" :key="ep.id">{{ep.title}}</li>
    </ul>
</template>

<script>
export default {
  name: "ShowOn",
  props: ["data", "index", "column"],
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>
