<template>
  <div>
    <img style="width:50px;height:50px;" :src="src" :alt="alt" />
  </div>
</template>

<script>
export default {
  name: "VtImg",
  props: ["data", "index", "column"],
  data() {
    return {
      src: "",
      alt: ""
    };
  },
  created() {
    // console.info(this.data);
    // console.info(this.index);
    // console.info(this.column);
    this.src = this.data.img;
    this.alt = this.data.name;
  }
};
</script>
