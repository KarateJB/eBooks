
var app = new Vue({
    el: "#app",
    data: {
        isShowModal: false
    },
    methods: {
        ok(){
            console.info("Confirmed!");
        },
        cancel(){
            console.info("Cancelled!");
        }
    },
    created() {
    }
})