
const FOO_DATA = [
    {
        value: 'Bright', label: 'Bright side',
        children: [
            {
                value: 'Male', label: 'Male',
                children: [
                    { value: 1, label: 'Luke Skywalker', img: 'https://goo.gl/KEUxHN' },
                    { value: 3, label: 'Anakin Skywalker', img: 'https://goo.gl/rvcqJN' },
                    { value: 6, label: 'Obi Wan Kenobi', img: 'https://goo.gl/7c5NkR' },
                    { value: 7, label: 'Mace Windu', img: 'https://goo.gl/VZsqrH' },
                    { value: 8, label: 'Yoda', img: 'https://goo.gl/uJQRGX' },
                ]
            },
            {
                value: 'Female', label: 'Female',
                children: [
                    { value: 2, label: 'Leia Skywalker', img: 'https://goo.gl/rNJhLU' },
                    { value: 4, label: 'Padme (Amidala)', img: 'https://goo.gl/CNr4WK' },
                    { value: 5, label: 'Rey', img: 'https://goo.gl/NEfjfi' },
                ]
            }
        ]
    },
    {
        value: 'Dark', label: 'Dark side',
        children: [
            {
                value: 'Male', label: 'Male',
                children: [
                    { value: 9, label: 'Darth Vader', img: 'https://goo.gl/xcMHqj' },
                    { value: 10, label: 'Darth Sidious', img: 'https://goo.gl/QJiJWx' },
                    { value: 11, label: 'Count Dooku', img: 'https://goo.gl/sm76q7' },
                    { value: 12, label: 'Darth Maul', img: 'https://goo.gl/ikbM7n' }
                ]
            },
            {
                value: 'Female', label: 'Female', disabled: true,
                children: [
                    { value: 13, label: 'Asajj Ventress', img: 'https://goo.gl/pr19sJ' }
                ]
            }
        ]
    }

];


var app = new Vue({
    el: "#app",
    data: {
        selected: [],
        starwars: [],

        text: "Please Select ..."
    },
    methods: {
        handleChange(value, selectedData) {
            var vm = this;
            // vm.text = selectedData.map(o => o.label).join(' => ');
            if (value.length === 3) {
                let target = selectedData[2];
                let name = target.label;
                let img = target.img;

                vm.text = `<img src='${img}' style='width:30px;height:30px'/>&nbsp;${name}`;
            }
            else
                vm.text = selectedData.map(o => o.label).join(' / ');
        },
        format(value, selectedData) {

            if (value.length === 3) {
                let gender = selectedData[1].label;
                let name = selectedData[2].label;

                return `${name} (${gender})`;
            }
            else
                return selectedData.map(o => o.label).join(' / ');
        }
    },
    created() {
        this.starwars = FOO_DATA;
        // this.selected = [ "Bright", "Male", 3 ];
    }
})