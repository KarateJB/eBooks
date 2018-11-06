<template>
  <div id="app">
    <div class="row">
        <div class="col-md-1">
        </div>
        <div class="col-md-10">
            <!-- Client table -->
            <v-client-table ref="myTable" :data="tableData" :columns="columns" :options="options">
              <template slot="selected" slot-scope="props">
                  <input v-model="props.row.selected" type="checkbox" />
              </template>
              <template slot="name" slot-scope="props">
                <a @click="edit(props.row.id)">{{ props.row.name }}</a>
              </template>
              <template slot="img" slot-scope="props">
                <img style="width:50px;height:50px;" :src="props.row.img" :alt="props.row.name" />
              </template>
            </v-client-table>
        </div>
        <div class="col-md-1">
        </div>
    </div>
  </div>
</template>

<script>

const FOO_DATA = [
        {id: 1, name:'Luke Skywalker',gender:'male', img:'https://goo.gl/KEUxHN', 
            showOn:[
              {id: "EP4", title: "A New Hope" },
              {id: "EP5", title: "The Empire Strikes Back" },
              {id: "EP6", title: "Return of the Jedi" },
              {id: "EP7", title: "The Force Awakens" },
              {id: "EP8", title: "The Last Jedi" }
            ]
        },
        {id: 2,name:'Leia Skywalker',gender:'female',img:'https://goo.gl/rNJhLU',
             showOn:[
              {id: "EP4", title: "A New Hope" },
              {id: "EP5", title: "The Empire Strikes Back" },
              {id: "EP6", title: "Return of the Jedi" },
              {id: "EP7", title: "The Force Awakens" },
              {id: "EP8", title: "The Last Jedi" }
            ]
        },
        {id: 3,name:'Anakin Skywalker',gender:'male',img:'https://goo.gl/rvcqJN',
             showOn:[
              {id: "EP1", title: "The Phantom Menace" },
              {id: "EP2", title: "Attack of the Clones" },
              {id: "EP3", title: "Revenge of the Sith" }
            ]
        },
        {id: 4,name:'Padme (Amidala)',gender:'female',img:'https://goo.gl/CNr4WK',
             showOn:[
              {id: "EP1", title: "The Phantom Menace" },
              {id: "EP2", title: "Attack of the Clones" },
              {id: "EP3", title: "Revenge of the Sith" }
            ]
        },
        {id: 5,name:'Rey',gender:'female',img:'https://goo.gl/NEfjfi',
             showOn:[
              {id: "EP7", title: "The Force Awakens" },
              {id: "EP8", title: "The Last Jedi" }
            ]
        },
        {id: 6,name:'Darth Vader',gender:'male',img:'https://goo.gl/xcMHqj',
             showOn:[
              {id: "EP3", title: "Revenge of the Sith" },
              {id: "EP4", title: "A New Hope" },
              {id: "EP5", title: "The Empire Strikes Back" },
              {id: "EP6", title: "Return of the Jedi" },
            ]
        },
        {id: 7,name:'Darth Sidious',gender:'male',img:'https://goo.gl/QJiJWx',
             showOn:[
              {id: "EP3", title: "Revenge of the Sith" },
              {id: "EP4", title: "A New Hope" },
              {id: "EP5", title: "The Empire Strikes Back" },
              {id: "EP6", title: "Return of the Jedi" },
            ]
        },
        {id: 8,name:'Count Dooku',gender:'male',img:'https://goo.gl/sm76q7',
             showOn:[
              {id: "EP2", title: "Attack of the Clones" },
              {id: "EP3", title: "Revenge of the Sith" }
            ]
        },
        {id: 9,name:'Darth Maul',gender:'male',img:'https://goo.gl/ikbM7n',
             showOn:[
              {id: "EP1", title: "The Phantom Menace" }
            ]
        }
];

export default {
  name: "vdom-demo",
  data() {
    return {
      columns: ["selected", "id", "name", "gender", "img"],
      tableData: [],
      options: {
        uniqueKey: "id", //Used to track the child rows, and return the original row in row click event
        sortable: ['id', 'name', 'gender'],
        childRow: function(h, row) {
            return h(
              "ul",
              {
                attrs: {
                  class: "list-group"
                }
              }, row.showOn.map(s => {
                  return h(
                      "li", 
                      {
                          attrs:{
                              class:"list-group-item"
                            }
                        }, s.title)
              })
            );
        },
        headings: {
          id: "ID",
          name: "Name",
          gender: "Gender",
          img: "Photo",
          selected: function(h) {
            return h("input", {
              attrs: {
                type: "checkbox",
                id: "selectAllCheckbox"
              },
              on: {
                click: e => {
                  this.selectAll(e.srcElement.checked);
                }
              },
              ref: "selectAllCheckbox"
            });
          }
        }
      }
    };
  },
  methods: {
    edit(id) {
      alert("Go to edit page with id : " + id);
    },
    selectAll(checked) {
      var vm = this;
      for (let i = 0; i < vm.tableData.length; i++) {
        let row = vm.tableData[i];

        //Only update the data in the filtered table data (all pages)
        if(vm.$refs.myTable.allFilteredData.some(x=>x.id === row.id) )
        {
          if (checked) {
            row.selected = true;
          } else {
            row.selected = false;
          }
        }
      }
    },
    initTableData(){
      var vm = this;
      let data = FOO_DATA.map(x=> { 
        x.selected=false;
        x.expanded=false;
        return x;
      } );
      return data;
    }
  },
  created() {
    var vm = this;
    vm.tableData = vm.initTableData();
  }
};
</script>

<style>
.VueTables__child-row-toggler {
    width: 16px;
    height: 16px;
    line-height: 16px;
    display: block;
    margin: auto;
    text-align: center;
}

.VueTables__child-row-toggler--closed::before {
    content: "+";
}

.VueTables__child-row-toggler--open::before {
    content: "-";
}
</style>