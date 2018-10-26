const FOO_DATA = [{
    name: 'Luke Skywalker',
    gender: 'male',
    img: 'https://goo.gl/KEUxHN'
},
{
    name: 'Leia Skywalker',
    gender: 'female',
    img: 'https://goo.gl/rNJhLU'
},
{
    name: 'Anakin Skywalker',
    gender: 'male',
    img: 'https://goo.gl/rvcqJN'
},
{
    name: 'Padme (Amidala)',
    gender: 'female',
    img: 'https://goo.gl/CNr4WK'
},
{
    name: 'Rey',
    gender: 'female',
    img: 'https://goo.gl/NEfjfi'
},
{
    name: 'Obi Wan Kenobi',
    gender: 'male',
    img: 'https://goo.gl/7c5NkR'
},
{
    name: 'Mace Windu',
    gender: 'male',
    img: 'https://goo.gl/VZsqrH'
},
{
    name: 'Yoda',
    gender: 'male',
    img: 'https://goo.gl/uJQRGX'
},
{
    name: 'Darth Vader',
    gender: 'male',
    img: 'https://goo.gl/xcMHqj'
},
{
    name: 'Darth Sidious',
    gender: 'male',
    img: 'https://goo.gl/QJiJWx'
},
{
    name: 'Count Dooku',
    gender: 'male',
    img: 'https://goo.gl/sm76q7'
},
{
    name: 'Darth Maul',
    gender: 'male',
    img: 'https://goo.gl/ikbM7n'
}
];




var app = new Vue({
    el: "#app",
    data: {
        starwars: [],
        keyword: "",
        matches: []
    },
    methods: {
        search(value){
            this.matches = this.starwars.filter(x=>x.name.startsWith(value));
        }
    },
    created() {
        this.starwars = FOO_DATA;
    }
})