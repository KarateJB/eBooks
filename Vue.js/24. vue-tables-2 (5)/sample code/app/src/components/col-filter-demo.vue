<template>
  <div id="app">
    <div class="row">
        <div class="col-md-1">
        </div>
        <div class="col-md-10">
            <div class="row">
              <div class="col-md-3">
                <input type="text" ref="keyword" class="form-control" placeholder="Search by name or sith/jedi"/>
              </div>
              <div class="col-md-3">
                <input type="button" class="form-control" value="Search" @click="search($refs.keyword.value)">
              </div>
            </div>
            <br />
            <v-client-table ref="myTable" :data="tableData" :columns="columns" :options="options">
              <template slot="name" slot-scope="props">
                <a @click="edit(props.row.id)">{{ props.row.name }}</a>
              </template>
              <template slot="img" slot-scope="props">
                <img style="width:50px;height:50px;" :src="props.row.img" :alt="props.row.name" />
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
    {id: 1, name:'Luke Skywalker',gender:'male', img:'https://goo.gl/KEUxHN'},
    {id: 2,name:'Leia Skywalker',gender:'female',img:'https://goo.gl/rNJhLU'},
    {id: 3,name:'Anakin Skywalker',gender:'male',img:'https://goo.gl/rvcqJN'},
    {id: 4,name:'Padme (Amidala)',gender:'female',img:'https://goo.gl/CNr4WK'},
    {id: 5,name:'Rey',gender:'female',img:'https://goo.gl/NEfjfi'},
    {id: 6,name:'Obi Wan Kenobi',gender:'male',img:'https://goo.gl/7c5NkR'},
    {id: 7,name:'Mace Windu',gender:'male',img:'https://goo.gl/VZsqrH'},
    {id: 8,name:'Yoda',gender:'male',img:'https://goo.gl/uJQRGX'},
    {id: 9,name:'Darth Vader',gender:'male',img:'https://goo.gl/xcMHqj'},
    {id: 10,name:'Darth Sidious',gender:'male',img:'https://goo.gl/QJiJWx'},
    {id: 11,name:'Count Dooku',gender:'male',img:'https://goo.gl/sm76q7'},
    {id: 12,name:'Darth Maul',gender:'male',img:'https://goo.gl/ikbM7n'}
];

export default {
  name: "col-filter-demo",
  data() {
    return {
      columns: ["id", "name", "gender", "img"],
      tableData: [],
      options: {
        filterByColumn:false,
        filterable: false,
        // filterable: ['name', 'gender'],
        customFilters: [{
            name: 'filterBySide',
            callback: function (row, query) {
                if(query.toLowerCase()==="sith")
                  return row.name.startsWith("Darth");
                else if(query.toLowerCase()==="jedi")
                  return row.name.endsWith("Skywalker");
                else
                  return row.name.toLowerCase().includes(query.toLowerCase());  
            }
        }],
        sortable: ['id', 'name', 'gender'],
        headings: {
          id: "ID",
          name: "Name",
          gender: "Gender",
          img: function(h) {
            return h(
              "a",
              {
                attrs: {
                  href: "https://www.starwars.com",
                  target: "_blank"
                },
                ref: "starwarslink"
              },
              "Photo"
            );
          }
        }
      }
    };
  },
  methods: {
    search(keyword){
      Event.$emit('vue-tables.filter::filterBySide', keyword);
    },
    edit(id) {
      console.log("Go to edit page with id : " + id);
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
      let data = FOO_DATA.map(x=> { 
        // x.selected=false;
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
