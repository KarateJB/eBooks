
const FOO_DATA = [
    {
        title: 'Bright side',expand: true,
        children: [
            {
                title: 'Male', expand: true,
                children: [
                    { title: 'Luke Skywalker', img: 'https://goo.gl/KEUxHN' },
                    { title: 'Anakin Skywalker', img: 'https://goo.gl/rvcqJN' },
                    { title: 'Obi Wan Kenobi', img: 'https://goo.gl/7c5NkR' },
                    { title: 'Mace Windu', img: 'https://goo.gl/VZsqrH' },
                    { title: 'Yoda', img: 'https://goo.gl/uJQRGX' },
                ]
            },
            {
                title: 'Female', expand: true,
                children: [
                    { title: 'Leia Skywalker', img: 'https://goo.gl/rNJhLU' },
                    { title: 'Padme (Amidala)', img: 'https://goo.gl/CNr4WK' },
                    { title: 'Rey', img: 'https://goo.gl/NEfjfi' },
                ]
            }
        ]
    },
    {
        title: 'Dark side', expand:false,
        children: [
            {
                title: 'Male',
                children: [
                    { title: 'Darth Vader', img: 'https://goo.gl/xcMHqj' },
                    { title: 'Darth Sidious', img: 'https://goo.gl/QJiJWx' },
                    { title: 'Count Dooku', img: 'https://goo.gl/sm76q7' },
                    { title: 'Darth Maul', img: 'https://goo.gl/ikbM7n' }
                ]
            },
            {
                title:'Female', disabled: true,
                children: [
                    { title: 'Asajj Ventress', img: 'https://goo.gl/pr19sJ' }
                ]
            }
        ]
    }

];


var app = new Vue({
    el: "#app",
    data: {
        selectedNode: null,
        starwars: [],
    },
    computed: {
        // selected(){
        //     let selected = [];
        //     let targetNode =[];
        //     do{

        //     }while(target)

        // }
    },
    methods: {
        selected(selectedItem){
            this.selectedNode = selectedItem[0];
            console.log(this.selectedNode);
        }
        // visit(node){
        //     let selected = [];
        //     if(node.selected || node.checked){
        //         selected.push(node.title)
        //     }
        // }
    },
    created() {
        this.starwars = FOO_DATA;
    }
})