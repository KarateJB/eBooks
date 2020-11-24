<template>
  <div id="app">
    <div class="row">
        <div class="col-md-1">
        </div>
        <div class="col-md-10">
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
        </div>
    </div>
  </div>
</template>

<script>
import daterangepicker from 'daterangepicker';

const FOO_DATA = [
    {id: 1, name:'Luke Skywalker',gender:'male', img:'https://goo.gl/KEUxHN', birth: '2018-01-01'},
    {id: 2,name:'Leia Skywalker',gender:'female',img:'https://goo.gl/rNJhLU', birth: '2018-02-01'},
    {id: 3,name:'Anakin Skywalker',gender:'male',img:'https://goo.gl/rvcqJN', birth: '2018-03-01'},
    {id: 4,name:'Padme (Amidala)',gender:'female',img:'https://goo.gl/CNr4WK', birth: '2018-04-01'},
    {id: 5,name:'Rey',gender:'female',img:'https://goo.gl/NEfjfi', birth: '2018-05-01'},
    {id: 6,name:'Obi Wan Kenobi',gender:'male',img:'https://goo.gl/7c5NkR', birth: '2018-06-01'},
    {id: 7,name:'Mace Windu',gender:'male',img:'https://goo.gl/VZsqrH', birth: '2018-07-01'},
    {id: 8,name:'Yoda',gender:'male',img:'https://goo.gl/uJQRGX', birth: '2018-08-01'},
    {id: 9,name:'Darth Vader',gender:'male',img:'https://goo.gl/xcMHqj', birth: '2018-09-01'},
    {id: 10,name:'Darth Sidious',gender:'male',img:'https://goo.gl/QJiJWx', birth: '2018-10-01'},
    {id: 11,name:'Count Dooku',gender:'male',img:'https://goo.gl/sm76q7', birth: '2018-11-01'},
    {id: 12,name:'Darth Maul',gender:'male',img:'https://goo.gl/ikbM7n', birth: '2018-12-01'}
];


export default {
  name: "col-listfilter-demo",
  data() {
    return {
      columns: ["id", "name","birth","gender", "img"],
      tableData: [],
      options: {
        filterByColumn: true,
        filterable: ['birth'],
        dateColumns:['birth'],
        dateFormat: 'YYYY-MM-DD',
        datepickerOptions: { //See http://www.daterangepicker.com/#options
            showDropdowns: true,
            autoUpdateInput: true,
        },
        sortable: ["id", "name", "gender"],
        headings: {
          id: "ID",
          name: "Name",
          birth: "Birthday",
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
    edit(id) {
      console.log("Go to edit page with id : " + id);
    },
    initTableData() {
      let data = FOO_DATA.map(x => {
        x.birth = moment(x.birth);
        return x;
      });
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
@import '../../node_modules/daterangepicker/daterangepicker.css';

.VueTables__date-filter {
  border: 1px solid #ccc;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
}
</style>