
var app = new Vue({
    el: "#app",
    data: {
        me: {
            name: "",
            birthday: "",
            age: null,
            description: ""
        },
        value: "",
        msg: "",
        myUrl: null,
        myUrlPre: null,
        myUrlSuf: null
    },
    methods: {
        search() {
            this.msg = `Searching ${this.value}`;
        },
        giveAge(birthday) {
            if (birthday)
                this.me.age = this.calAge(birthday);
        },
        calAge(targetDate) {
            var today = new Date();
            var birthDate = new Date(targetDate);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
    },
    created() {
    }
})