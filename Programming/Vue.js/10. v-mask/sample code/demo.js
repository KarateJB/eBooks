Vue.use(VueMask.VueMaskPlugin);

var app = new Vue({
    el: "#app",
    data: {
        me: {
            nameZh: null,
            nameEn: null,
            birthday: null,
            age: null,
            phone: null
        },
        keys: ""
    },
    computed: {
        birthdayPlaceholder() {
            var vm = this;
            let text = "yyyy/MM/dd";
            if (vm.me.nameZh && !vm.me.nameEn) {
                text = "yy(民國年)/MM/dd";
            }
            return text;
        },
        birthdayFormat() {
            var vm = this;
            let format = "####/##/##";
            if (vm.me.nameZh && !vm.me.nameEn) {
                format = "##/##/##";
            }
            return format;
        }
    },
    methods: {
        keymonitor(event) {
            this.keys += event.key;
        }
    },
    mounted() {}
})