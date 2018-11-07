<template>
  <div id="app">
      <p>
        <router-link to="/custom-filter-demo">Custom Filter Demo</router-link> / 
        <router-link to="/col-filter-demo">Column Filter Demo</router-link> /
        <router-link to="/col-listfilter-demo">Column List Filter Demo</router-link> 
      </p>
      <!-- route outlet -->
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
     
    };
  },
  methods: {
  },
  created() {
  }
};
</script>
