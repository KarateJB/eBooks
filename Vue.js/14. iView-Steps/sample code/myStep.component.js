Vue.component('myStep', {
    props: [
        'data'
    ],
    data: function () {
        return {
        };
    },
    template: '<div><h2>{{ data.title }}</h2><br />{{ data.description }}<div>'
})
