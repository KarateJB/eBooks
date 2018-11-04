<template>
  <div id="app">
    <div class="row">
        <div class="col-md-1">
        </div>
        <div class="col-md-10">
            <!-- Client table -->
            <v-client-table ref="myTable" :data="tableData" :columns="columns" :options="options"></v-client-table>
        </div>
        <div class="col-md-1">
            <button class="btn btn-alert" @click="showFilteredData">Show filtered data</button>
        </div>
    </div>
  </div>
</template>

<script>
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
  name: "clientTableDemo",
  data() {
    return {
      columns: ["id", "name", "gender"],
      tableData: [],
      options: {
        // filterByColumn:true,
        // filterable: ['name', 'gender'],
      }
    };
  },
  methods: {
    showFilteredCurrentPageData() {
      //Get the filtered table data on current page
      console.log(this.$refs.myTable.filteredData);
    },
    showFilteredData() {
      //Get the filtered table data on all pages
      console.log(this.$refs.myTable.allFilteredData);
    }
  },
  created() {
    this.tableData = FOO_DATA;
  }
};
</script>
