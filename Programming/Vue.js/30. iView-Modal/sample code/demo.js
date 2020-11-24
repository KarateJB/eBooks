
var app = new Vue({
    el: "#app",
    data: {
        isShowModal1: false,
        isShowModal2: false,
        isShowModal3: false,
        isShowModal4: false,
        isShowModal5: false,
        value: ""
    },
    methods: {
        ok() {
            console.info("Confirmed!");
        },
        asyncOk() {
            setTimeout(() => {
                this.isShowModal3 = false;
            }, 2500);
        },
        cancel() {
            console.info("Cancelled!");
        },
        openModal(type) {
            let msg = "Hello, this is iView Modal!";
            switch (type) {
                case "info":
                    this.$Modal.info({
                        title: "Info",
                        content: msg
                    });
                    break;
                case "success":
                    this.$Modal.success({
                        title: "Success",
                        content: msg
                    });
                    break;
                case "warning":
                    this.$Modal.warning({
                        title: "Warning",
                        content: msg
                    });
                    break;
                case "error":
                    this.$Modal.error({
                        title: "Error",
                        content: msg
                    });
                    break;
                case "confirm":
                    this.$Modal.confirm({
                        title: 'Confirm',
                        content: msg,
                        onOk: () => { console.log("Confirmed")},
                        onCancel: () => { console.log("Cancelled")}
                    });
                    break;

            }
        },
        customContent(){
            this.$Modal.confirm({
                render: (h) => {
                    return h('input', {
                        props: {
                            placeholder: 'Who is this?'
                        },
                        on: {
                            blur: (event) => {
                                this.value = event.target.value;
                            }
                        }
                    })
                },
                onOk: () => { alert(`Hello, ${this.value}`)}
            })
        }
    },
    created() {
    }
})