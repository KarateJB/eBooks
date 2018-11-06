<template>
  <div>
    <a href="#">{{ data.name }}</a>
  </div>
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
