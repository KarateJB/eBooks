<template>
  <div>
      
    <a @click="edit(data.id)">{{ data.name }}</a>
  </div>
</template>

<script>
export default {
  name: "Child",
  props: ["data", "index", "column"],
  data() {
    return {
    };
  },
  methods: {
      edit(id){
          alert("Redirect to edit page with id :" + id);
      }
  }
};
</script>
