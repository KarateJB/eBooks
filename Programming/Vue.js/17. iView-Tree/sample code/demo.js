
const FOO_DATA = [
    {
        title: 'Bright side', expand: true,

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
        title: 'Dark side', expand: false,
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
                title: 'Female', disabled: true,
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
        starwars: [],

        buttonProps: {
            type: 'default',
            size: 'small',
        },

        selectedNode: null, //Current selected node
        checkedNodes: [] //All checked nodes
    },
    methods: {
        selected(selectedItem) {
            this.selectedNode = selectedItem[0];
            alert(`You select ${this.selectedNode.title}`);
        },
        checked(checkedItems) {
            // this.checkedNodes = checkedItems;

            // Get all checked nodes manually by recursive 
            this.checkedNodes = [];
            this.visit(this.starwars);
        },
        visit(nodes) {
            nodes.forEach(node => {

                if (node.checked === true) {
                    this.checkedNodes.push(node);
                }

                if (node.children)
                    this.visit(node.children);
                else
                    return
            });

        },

        /// For describing the usage of render
        // renderContent(h, { root, node, data }) {
        //     return h('center', {
        //         style: { width: '100%',backgroundColor: 'green'}}, 
        //         [
        //             h('center', {
        //                 style: { width: '70%', backgroundColor: 'black' }},
        //                 [
        //                    h('span', { style: {width: '30%', backgroundColor: 'yellow' } }, data.title)
        //                 ] 
        //             ),
        //         ]
        //     );
        // },

        renderContent (h, { root, node, data }) {
            return h('span', {
                style: { display: 'inline-block', width: '100%'}
            }, [
                h('span', [ h('Icon', {
                                props: { type: 'ios-paper-outline' },
                                style: { marginRight: '8px' }
                            }), 
                            h('span', data.title)
                          ]),
                h('span', {
                    style: {display: 'inline-block',float: 'right',marginRight: '32px'}
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {icon: 'ios-add'}),
                            style: {marginRight: '8px'},
                            on: { click: () => { this.append(data) }}
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, { icon: 'ios-remove'}),
                            on: { click: () => { this.remove(root, node, data) }}
                        })
                    ])
            ]);
        },
        append(data) {
            const children = data.children || [];
            children.push({
                title: 'New node',
                expand: true
            });
            this.$set(data, 'children', children);
        },
        remove(root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        }

    },
    created() {
        this.starwars = FOO_DATA;
    }
})




