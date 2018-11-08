<template>
  <li class="mi-item">
        <a class="version-item">
            <div class="version-item-img">
                <img class="lazy" :src="data.img">
            </div>
            <div class="version-item-intro">
                <h3>{{data.name}}({{ data.gender }})</h3>
            </div>
        </a> 
  </li>
</template>

<script>

export default {
  name: "ListRow",
  props: {
      data: {
            type: Object,
            required: true
        }
  },
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
<style>
.mi-item {
  padding: 0 0 3px;
  position: absolute;
  background: #fff;
  width: 100%;
  list-style: none;
}
.mi-item::after {
  content: "";
  position: absolute;
  bottom: 1.5px;
  left: 150px;
  right: 0;
  /* border-bottom: 1px solid #e4e4e4; */
}
.version-item {
  display: flex;
  display: -webkit-box;
  box-align: center;
  -webkit-box-align: center;
  width: 100%;
}
.version-item-img {
    width: 180px;
    height: 180px;
    position: relative;
}
.version-item-img img {
    width: 100%;
}
.version-item .version-item-intro {
  -webkit-box-flex: 1;
  box-flex: 1;
  display: block;
  padding: 0 15px 5px;
}

</style>