<template>
  <div id="app">
      <p>
        <router-link to="/scoped-slot-demo">Scoped-slots Demo</router-link> / 
        <router-link to="/vdom-demo">Virtual DOM function Demo</router-link> /
        <router-link to="/component-demo">Component Demo</router-link> 
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
