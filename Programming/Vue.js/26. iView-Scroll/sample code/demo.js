const FOO_DATA_BASIC = [
    {id: 1, name:'Luke Skywalker',gender:'male', img:'https://goo.gl/KEUxHN'},
    {id: 3,name:'Anakin Skywalker',gender:'male',img:'https://goo.gl/rvcqJN'},
    {id: 11,name:'Count Dooku',gender:'male',img:'https://goo.gl/sm76q7'},
];

const FOO_DATA_BRIGHT = [
    {id: 1, name:'Luke Skywalker',gender:'male', img:'https://goo.gl/KEUxHN'},
    {id: 2,name:'Leia Skywalker',gender:'female',img:'https://goo.gl/rNJhLU'},
    {id: 3,name:'Anakin Skywalker',gender:'male',img:'https://goo.gl/rvcqJN'},
    {id: 4,name:'Padme (Amidala)',gender:'female',img:'https://goo.gl/CNr4WK'},
    {id: 5,name:'Rey',gender:'female',img:'https://goo.gl/NEfjfi'},
    {id: 6,name:'Obi Wan Kenobi',gender:'male',img:'https://goo.gl/7c5NkR'},
    {id: 7,name:'Mace Windu',gender:'male',img:'https://goo.gl/VZsqrH'},
    {id: 8,name:'Yoda',gender:'male',img:'https://goo.gl/uJQRGX'}
];

const FOO_DATA_DARK = [
    {id: 9,name:'Darth Vader',gender:'male',img:'https://goo.gl/xcMHqj'},
    {id: 10,name:'Darth Sidious',gender:'male',img:'https://goo.gl/QJiJWx'},
    {id: 11,name:'Count Dooku',gender:'male',img:'https://goo.gl/sm76q7'},
    {id: 12,name:'Darth Maul',gender:'male',img:'https://goo.gl/ikbM7n'}
];


var app = new Vue({
    el: "#app",
    data: {
        listData: []
    },
    methods: {
        handleReachBottom () {
            return new Promise(resolve => {
                setTimeout(() => {
                    for (let i = 0; i < 3; i++) { //Get random 3 records
                        let rndIndex = this.getRandomInt(0, FOO_DATA_BRIGHT.length-1)
                        this.listData.push(FOO_DATA_BRIGHT[rndIndex]);
                    }
                    resolve();
                }, 2000);
            });
        },
        handleReachTop(){
            return new Promise(resolve => {
                setTimeout(() => {
                    for (let i = 0; i < 3; i++) { //Get random 3 records
                        let rndIndex = this.getRandomInt(0, FOO_DATA_DARK.length-1)
                        this.listData.push(FOO_DATA_DARK[rndIndex]);
                    }
                    resolve();
                }, 2000);
            });
        },
        getRandomInt(min,max) {
            return Math.floor(Math.random()*(max-min+1)+min);
        }
    },
    created() {
        this.listData = FOO_DATA_BASIC;
    }
})