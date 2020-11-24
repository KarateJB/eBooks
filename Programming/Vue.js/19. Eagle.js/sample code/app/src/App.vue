<template>
  <div id="app">
    <slider></slider>
  </div>
</template>

<script>
import Slider from './components/Slider.vue'



export default {
  name: 'app',
  components: {
    slider: Slider,
  },
  data () {
    return {
    }
  }
}
</script>
