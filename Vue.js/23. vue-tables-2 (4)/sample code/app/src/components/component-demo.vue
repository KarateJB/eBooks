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
              <template slot="showOn" slot-scope="props">
                <button v-show="!props.row.expanded" class="btn btn-link" 
                        @click="(tableData.find(x=>x.id===props.row.id)).expanded=true">
                  {{ props.row.showOn[0].title + "..." }}
                </button>
                <ul class="list-group" v-show="props.row.expanded">
                  <li class="list-group-item"  v-for="ep in props.row.showOn" :key="ep.id">{{ep.title}}</li>
                </ul>
              </template>
            </v-client-table>
        </div>
        <div class="col-md-1">
            <button class="btn btn-alert" @click="showFilteredData">Show filtered data</button>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

const FOO_DATA = [
        {id: 1, name:'Luke Skywalker',gender:'male', img:'https://goo.gl/KEUxHN', 
            showOn:[
              {id: "1-EP4", title: "A New Hope" },
              {id: "1-EP5", title: "The Empire Strikes Back" },
              {id: "1-EP6", title: "Return of the Jedi" },
              {id: "1-EP7", title: "The Force Awakens" },
              {id: "1-EP8", title: "The Last Jedi" }
            ]
        },
        {id: 2,name:'Leia Skywalker',gender:'female',img:'https://goo.gl/rNJhLU',
             showOn:[
              {id: "2-EP4", title: "A New Hope" },
              {id: "2-EP5", title: "The Empire Strikes Back" },
              {id: "2-EP6", title: "Return of the Jedi" },
              {id: "2-EP7", title: "The Force Awakens" },
              {id: "2-EP8", title: "The Last Jedi" }
            ]
        },
        {id: 3,name:'Anakin Skywalker',gender:'male',img:'https://goo.gl/rvcqJN',
             showOn:[
              {id: "3-EP1", title: "The Phantom Menace" },
              {id: "3-EP2", title: "Attack of the Clones" },
              {id: "3-EP3", title: "Revenge of the Sith" }
            ]
        },
        {id: 4,name:'Padme (Amidala)',gender:'female',img:'https://goo.gl/CNr4WK',
             showOn:[
              {id: "4-EP1", title: "The Phantom Menace" },
              {id: "4-EP2", title: "Attack of the Clones" },
              {id: "4-EP3", title: "Revenge of the Sith" }
            ]
        },
        {id: 5,name:'Rey',gender:'female',img:'https://goo.gl/NEfjfi',
             showOn:[
              {id: "5-EP7", title: "The Force Awakens" },
              {id: "5-EP8", title: "The Last Jedi" }
            ]
        },
        {id: 6,name:'Darth Vader',gender:'male',img:'https://goo.gl/xcMHqj',
             showOn:[
              {id: "6-EP3", title: "Revenge of the Sith" },
              {id: "6-EP4", title: "A New Hope" },
              {id: "6-EP5", title: "The Empire Strikes Back" },
              {id: "6-EP6", title: "Return of the Jedi" },
            ]
        },
        {id: 7,name:'Darth Sidious',gender:'male',img:'https://goo.gl/QJiJWx',
             showOn:[
              {id: "7-EP3", title: "Revenge of the Sith" },
              {id: "7-EP4", title: "A New Hope" },
              {id: "7-EP5", title: "The Empire Strikes Back" },
              {id: "7-EP6", title: "Return of the Jedi" },
            ]
        },
        {id: 8,name:'Count Dooku',gender:'male',img:'https://goo.gl/sm76q7',
             showOn:[
              {id: "8-EP2", title: "Attack of the Clones" },
              {id: "8-EP3", title: "Revenge of the Sith" }
            ]
        },
        {id: 9,name:'Darth Maul',gender:'male',img:'https://goo.gl/ikbM7n',
             showOn:[
              {id: "9-EP1", title: "The Phantom Menace" }
            ]
        }
];

export default {
  name: "component-demo",
  data() {
    return {
      columns: ["selected", "id", "name", "gender", "img", "showOn"],
      tableData: [],
      options: {
        uniqueKey: "id",
        sortable: ['id', 'name', 'gender'],
        headings: {
          id: "ID",
          name: "Name",
          gender: "Gender",
          img: "Photo",
          showOn: "Show on",
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
    showFilteredCurrentPageData() {
      //Get the filtered table data on current page
      console.log(this.$refs.myTable.filteredData);
    },
    showFilteredData() {
      //Get the filtered table data on all pages
      console.log(this.$refs.myTable.allFilteredData);
    },
    initTableData(){
      var vm = this;
      let data = FOO_DATA.map(x=> { 
        // vm.$set(x, "selected", false);
        // vm.$set(x, "expanded", false);
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
