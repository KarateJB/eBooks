<template>
  <div id="app">
        <p>
        <router-link to="/client-table-demo">Client Table Demo</router-link> / 
        <router-link to="/server-table-demo">Server Table Demo</router-link>
      </p>
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
