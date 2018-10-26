
const FOO_DATA = [
    'Luke Skywalker',
    'Leia Skywalker',
    'Anakin Skywalker',
    'Padme (Amidala)',
    'Rey',
    'Obi Wan Kenobi',
    'Mace Windu',
    'Yoda',
    'Darth Vader',
    'Darth Sidious',
    'Count Dooku',
    'Darth Maul',
];

// Vue.use(iView);

var app = new Vue({
    el: "#app",
    data: {
        starwars: [],
        keyword: "",
        matches: []
    },
    methods: {
        search(value){
            this.matches = this.starwars.filter(x=>x.startsWith(value));
        }
    },
    created() {
        this.starwars = FOO_DATA;
    }
})