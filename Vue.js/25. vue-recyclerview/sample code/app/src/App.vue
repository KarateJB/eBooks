<template>
    <div class="container" id='app'>
        <div class="row">
            <div class="col-md-1">
            </div>
            <div class="col-md-10">
                <recycler-view style="height: calc(100vh - 50px)"
                    :prerender="5"
                    :fetch="Fetch" 
                    :item="ListRow" 
                  ></recycler-view>

            </div>
            <div class="col-md-1">
            </div>
        </div>
    </div>
</template>

<script>
import ListRow from "./components/list-row"
import Fetch from './components/sw-fetch.js'


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
  name: 'app',
  data () {
    return {
      starwars: [],
      ListRow,
      Fetch,
    }
  },
  created(){
    this.starwars = FOO_DATA;
  }
}
</script>

<style>
.recyclerview-container {
  position: relative;
}
.recyclerview-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #9E9E9E;
}
.recyclerview {
  background: #fff;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
  contain: layout;
  will-change: transform;
}
</style>
