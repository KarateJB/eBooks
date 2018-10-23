Vue.use(VueMarkdown);

var app = new Vue({
    el: "#app",
    data:{
        now: new Date().toLocaleTimeString(),
        myHtml: "<h2>HTML</h2>",
        linkAttrs: {
            target: '_blank',
            id: 'mylink'
          } 
    },
    mounted() {
        setInterval(() => {
            this.now = new Date().toLocaleTimeString();
          }, 1000);
    },
})