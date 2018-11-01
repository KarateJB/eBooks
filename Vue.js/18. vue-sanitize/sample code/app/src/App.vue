<template>
  <div id="app">
        <div class="container">
        <div class="row">
            <div class="col-md-2">
            </div>
              <div class="col-md-8">
                <textarea style="width: 100%; height: 30%;" v-model="dirtyHtml">
                </textarea> 
            </div>
            <div class="col-md-2">
              <button class="btn btn-default" @click="renderHtml">Render</button>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      dirtyHtml: ""
    };
  },
  methods:{
    renderHtml(){
      var vm = this;
      let cleanedHtml = "";

      //1. No sanitize
      // cleanedHtml = vm.dirtyHtml;

      //2. Use default options
      // cleanedHtml = vm.$sanitize(vm.dirtyHtml);

      //3. Use default options and allow new ones
      cleanedHtml = vm.$sanitize(vm.dirtyHtml);
      // cleanedHtml = vm.$sanitize(vm.dirtyHtml, {
      //   allowedTags: this.$sanitize.defaults.allowedTags.concat(['script','img' ])
      // });

      document.write(cleanedHtml);
    }
  },
  created(){
    this.$sanitize.defaults.allowedTags = 
          this.$sanitize.defaults.allowedTags.concat(['script','img' ]);
    this.$sanitize.defaults.allowedAttributes.img = 
          this.$sanitize.defaults.allowedAttributes.img.concat(['src','style']);
  }
};
</script>