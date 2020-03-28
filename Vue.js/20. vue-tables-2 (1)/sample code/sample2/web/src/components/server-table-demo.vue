<template>
  <div id="app">
    <div class="row">
        <div class="col-md-1">
        </div>
        <div class="col-md-10">
            <!-- Server table -->
             <!-- <v-server-table url="http://localhost:3000/starwars" :columns="columns" :options="options"></v-server-table> -->
             <v-server-table :columns="columns" :options="options"></v-server-table>
        </div>
        <div class="col-md-1">
            <button class="btn btn-alert" @click="showFilteredData">Show filtered data</button>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "serverTableDemo",
  data() {
    return {
      columns: ["id", "name", "gender"],
      tableData: [],
      options: {
        // filterByColumn:true,
        // filterable: ['name', 'gender'],
        texts: {
            filter:"Search : ",
            filterPlaceholder:"Search your favorite Star Wars character",
        },
        requestFunction: function (params) {
            return axios.get("http://localhost:3000/starwars", {
              params: params
            });
        }
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
  }
};
</script>
