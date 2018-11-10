<template>
    <div class="container">
        <div class="row">
            <div class="col-md-1">
            </div>
            <div class="col-md-10">
              <pre>{{ fbObject }}</pre>
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th>Type</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in fbArray" :key="item.id">
                    <td>{{ item.type }}</td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.price }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-1">
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'prod-list',
  data () {
    return {
      fbArray: [],
      fbObject: {}
    }
  },
  // firebase: {
  //     fbArray: firebaseDb.ref('Demo/products').limitToLast(10), //bind as an array
  //     fbObject: {
  //       source: firebaseDb.ref('Demo/products/800afd3c-1615-49ba-b33d-497842af6c82'),
  //       asObject: true, //Bind as object
  //       cancelCallback: function () {
  //         console.log("Not ready for the object!");
  //       },
  //       readyCallback: function () { 
  //         console.log("Get ready for the object!");
  //     }
  //   }
  // },
  mounted(){
    var vm = this;
    // let products = db.ref('/Demo/products/');
    // this.afDb.object<Product>('/Demo/products/' + key).valueChanges().take(1).map(x => <Product>x);
    vm.$bindAsArray('fbArray', firebaseDb.ref('Demo/products').limitToLast(25));
    vm.$bindAsObject('fbObject', firebaseDb.ref('Demo/products').child('800afd3c-1615-49ba-b33d-497842af6c82'));
  },
  created(){
    // console.log(this.fbArray);
    // console.log(this.fbObject);
  }
}
</script>

<style>
</style>
