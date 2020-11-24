Vue.component('paginate', VuejsPaginate)

const PAGE_SIZE = 2; //Show how many records in a single page
const FOO_DATA = [
    {name:'Luke Skywalker',gender:'male', img:'https://goo.gl/KEUxHN'},
    {name:'Leia Skywalker',gender:'female',img:'https://goo.gl/rNJhLU'},
    {name:'Anakin Skywalker',gender:'male',img:'https://goo.gl/rvcqJN'},
    {name:'Padme (Amidala)',gender:'female',img:'https://goo.gl/CNr4WK'},
    {name:'Rey',gender:'female',img:'https://goo.gl/NEfjfi'},
    {name:'Obi Wan Kenobi',gender:'male',img:'https://goo.gl/7c5NkR'},
    {name:'Mace Windu',gender:'male',img:'https://goo.gl/VZsqrH'},
    {name:'Yoda',gender:'male',img:'https://goo.gl/uJQRGX'},
    {name:'Darth Vader',gender:'male',img:'https://goo.gl/xcMHqj'},
    {name:'Darth Sidious',gender:'male',img:'https://goo.gl/QJiJWx'},
    {name:'Count Dooku',gender:'male',img:'https://goo.gl/sm76q7'},
    {name:'Darth Maul',gender:'male',img:'https://goo.gl/ikbM7n'}];

var app = new Vue({
    el: "#app",
    data:{
        listdata: [],
        currentPage: 1,
        pageCount: 1
    },
    computed: {
        pagedListdata: function () {
            var vm = this;
            if (vm.listdata && vm.listdata.length > 0) {
                return vm.listdata.filter(function (x) {
                    return x.page === vm.currentPage;
                })
            }
            else {
                return [];
            }
        }
    },
    watch: {
        listdata: function (val) {
            this._setPage2Model();
        }
    },
    methods:{

        _setPage2Model: function () {
            var vm = this;

            if (!vm.listdata || vm.listdata.length <= 0) {
                vm.pageCount = 1;
            }
            else {
                vm.pageCount = parseInt(vm.listdata.length / PAGE_SIZE) + (vm.listdata.length % PAGE_SIZE > 0 ? 1 : 0);
                for (let i = 0; i < vm.listdata.length; i++) {
                    vm.$set(vm.listdata[i], "page", parseInt(i / PAGE_SIZE) + 1);
                }
            }
        },

        pageCallback: function (page) {
            var vm = this;
            this.$set(vm, 'currentPage', page);
        }
        
    },
    created() {
        var vm =this;
        vm.listdata = FOO_DATA;
    },
})