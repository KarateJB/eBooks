<template>
  <div  class="main">
  <slide :steps="3">
    <h3>{{ step }}</h3>
    <div v-if="step==1">
      <h1 class="title text-center"><b>2018年台北地區福委會 第四季慶生會</b></h1>
    </div>
    <div v-if="step==2">
      <div class="title text-center"><h1>新進同仁名單</h1></div>
      <table class="table emptable center-block" style="max-width:80%">
        <tr v-for="emp in onBoards">
          <td class="col-md-2"><label class="content">{{emp.name}}</label></td>
          <td class="col-md-4"><label class="content">{{emp.department}}</label></td>
        </tr>
      </table>
    </div>
    <div v-if="step==3">
    <div class="title text-center"><h1>壽星名單</h1></div>
      <table class="table emptable center-block" style="max-width:80%">
        <tr v-for="emp in bdayCrew">
          <td class="col-md-2"><label class="content">{{emp.name}}</label></td>
          <td class="col-md-4"><label class="content">{{emp.department}}</label></td>
        </tr>
      </table>
    </div>
  </slide>
  </div>
</template>

<script>
// import { Slideshow } from "eagle.js";
import eagle from "eagle.js";

const ON_BOARDS = [
  { empNo: "1001", name: "Luke Skywalker", department: "Backend team" },
  { empNo: "1002", name: "Leia Skywalker", department: "UI/UX team" },
  { empNo: "1003", name: "Anakin Skywalker", department: "Sales" },
  { empNo: "1004", name: "Darth Maul", department: "Sales" },
  { empNo: "1005", name: "Obi wan kenobi", department: "DBA" }
];

const BDAY_CREW = [
  { name: "Yoda", department: "" },
  { name: "Padme Amidala", department: "" },
  { name: "Count Dooku", department: "" }
];

export default {
  name: "slider",
  // mixins: [Slideshow],
  mixins: [eagle.slideshow],
  data() {
    return {
      step: 1,
      onBoards: [],
      bdayCrew: []
    };
  },
  created() {
    this.onBoards = ON_BOARDS;
    this.bdayCrew = BDAY_CREW;
  },
  mounted() {
    this.zoom = true;
    this.mouseNavigation = true;
    this.keyboardNavigation = true;
    this.repeat = true;
  }
};
</script>


<style>
.title {
  color: mediumvioletred;
  font: bold;
  /*font-size: 40px;*/
}

.content {
  font-family: "標楷體";
  font: bold;
  font-size: 25px;
  /*background-color: lightblue;*/
}

.content span {
  background-color: yellow;
}

.content-sm {
  font-family: "標楷體";
  font: bold;
  font-size: 15px;
}

.text-center {
  text-align: center;
}

.emptable {
  background-color: lightyellow;
}

.main {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("https://www.happy-birthday-to-you.net/wp-content/uploads/2018/02/star-wars-happy-birthday-2-1024x576.jpg");
  background-repeat: no-repeat; /*we want to have one single image not a repeated one*/
  background-size: cover; /*this sets the image to fullscreen covering the whole screen*/
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: -1;
}
</style>
