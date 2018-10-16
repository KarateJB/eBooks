Vue.use(AsyncComputed);

var app = new Vue({
    el: "#app",
    data:{
        clickTimes: 0,
        isReload: false 
    },
    asyncComputed: {
        movies: {
            get() {
                var vm = this;
                vm.isReload = true;
                let options = [];
                console.log("Get movies..");
                return axios.get('http://localhost:9488/api/Fm/Emp/GetMovie')
                    .then(function (response) {
                        if (response.data) {
                            response.data.forEach(function (item) {
                                options.push({
                                    text: item.name,
                                    value: item.id
                                });
                            });
                        }
                        vm.isReload = false;
                        return options;
                    });
            },
            // default: [{
            //     text: 'Loading...',
            //     value: '0'
            // }]
            default () {
                return [{ text: 'Loading...', value: '0'}];
            },
            watch(){
                this.clickTimes
            },
            // shouldUpdate(){
            //     return this.clickTimes%2==0; 
            // }
        }
    },
    methods:{

        recalculate(){
            var vm = this;
            vm.clickTimes++;
        }
    }
})