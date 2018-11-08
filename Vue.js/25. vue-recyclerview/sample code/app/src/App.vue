<template>
    <div class="container" id='app' @click="returnToTop">
        <div class="row">
            <div class="col-md-1">
            </div>
            <div class="col-md-10">
                <recycler-view style="height: calc(100vh - 50px)"
                    ref="myRecycler"
                    :prerender="2"
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


export default {
  name: 'app',
  data () {
    return {
      ListRow,
      Fetch,
    }
  },
  methods: {
    returnToTop(){
      this.$refs.myRecycler.scrollToIndex(2);
    }
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
