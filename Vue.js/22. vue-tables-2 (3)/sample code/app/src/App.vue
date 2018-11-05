<template>
  <div id="app">
    <div class="row">
        <div class="col-md-1">
        </div>
        <div class="col-md-10">
            <!-- Client table -->
            <v-client-table ref="myTable" :data="tableData" :columns="columns" :options="options" 
                            @checked>
            </v-client-table>
        </div>
        <div class="col-md-1">
        </div>
    </div>
  </div>
</template>

<script>
import VtCheckbox from './components/vt-checkbox';
import VtEdit from './components/vt-edit';
import VtImg from './components/vt-img';


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
  name: "app",
  components: { VtImg, VtEdit, VtCheckbox },
  data() {
    return {
      columns: ["selected", "id", "name", "gender", "img"],
      tableData: [],
      options: {
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
          },
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
        },
        templates: {
            selected: VtCheckbox,
            name: VtEdit,
            img: VtImg
        }
      }
    };
  },
  methods: {
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
      let data = FOO_DATA.map(x=> { 
        x.selected=false;
        return x;
      } );
      return data;
    }
  },
  created() {
    var vm = this;
    vm.tableData = vm.initTableData();

    Event.$on('vue-tables.checked', function (data) {
      let row = vm.tableData.find(x=>x.id===data.id);
      row.selected = data.selected;
      console.log(row);
    });
  }
};
</script>
