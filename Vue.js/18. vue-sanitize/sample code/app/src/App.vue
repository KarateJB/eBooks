<template>
  <div id="app">
        <div class="container">
        <div class="row">
            <div class="col-md-2">
            </div>
              <div class="col-md-8">
                <textarea style="width: 100%; height: 30%;" v-model="myHtml">
                </textarea> 
                <div v-html="cleanedHtml">
                </div>
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
      myHtml: ""
    };
  },
  computed: {
    cleanedHtml() {
      var vm = this;
      return vm.$sanitize(vm.myHtml);
    }
  },
  methods:{
    renderHtml(){
      var vm = this;
      // let html = vm.myHtml;
      let html = vm.$sanitize(vm.myHtml);
      document.write(html);
      // document.execCommand('insertHTML', false, (html));
    }
  }
};
</script>