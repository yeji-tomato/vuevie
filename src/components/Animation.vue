<template>
  <div id="projectorContainer">
    <div class="projectorLight">
      <!---
    .cover background must be the same as the page background.
--->
      <div class="cover"></div>
      <div class="cover"></div>
    </div>
       
    <div class="projectorBody">
      <div class="lensHold"></div>
      <div class="lens"></div>
    </div>
    <div
      class="filmDisk"
      id="film1">
      <div class="fdBack">
        <div class="fdFilm"></div>
        <div class="fdBar"></div>
        <div class="fdBar2"></div>
        <div class="fdCover"></div>
      </div>
    </div>
    <div
      class="filmDisk"
      id="film2">
      <div class="fdBack">
        <div class="fdFilm"></div>
        <div class="fdBar"></div>
        <div class="fdBar2"></div>
        <div class="fdCover"></div>
      </div>
    </div>
  </div>
</template>


<style scoped>
#projectorContainer{
position: relative;
height: 200px;
width: 200px;
margin: 50px auto;
}
.filmDisk{
  position: absolute;
    height: 60%;
    width: 60%;
    animation: rot 2s infinite linear;
}
.fdBack{
    height: 100%;
    width: 100%;
    background-color: gray;
    border-radius: 50%;
}
.fdFilm{
    position: absolute;
    height: 70%;
    width: 70%;
    top: 15%;
    left: 15%;
    background-color: rgb(50,50,50);
    border-radius: 50%;
}
.fdBar{
    position: absolute;
    height: 95%;
    width: 15%;
    top: 2.5%;
    left: 42.5%;
    background-color: gray;
}
.fdBar2{
    position: absolute;
    width: 95%;
    height: 15%;
    top: 42.5%;
    left: 2.5%;
    background-color: gray;
}
.fdCover{
    position: absolute;
    height: 35%;
    width: 35%;
    top: 32.5%;
    left: 32.5%;
    background-color: gray;
    border-radius: 50%;
}
#film1{
    top: -5%;
    left: -20%;
}
#film2{
    top: -5%;
    right: -5%;
}
.projectorBody{
    position: absolute;
    height: 60%;
    width: 90%;
    top: 40%;
    background-color: rgb(70,70,70);
    border-radius: 20px;
}
.lens{
    position: absolute;
    height: 30%;
    width: 20%;
    left: 105%;
    top: 40%;
    background-color: gray;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.lensHold{
     position: absolute;
    height: 20%;
    width: 10%;
    left: 100%;
    top: 45%;
    background-color: gray;
}
.projectorLight{
    position: absolute;
    opacity: 0.8;
    height: 60%;
    width: 90%;
    left: 110%;
    top: 42.9%;
    background-color: rgb(255,228,196);
    animation: light 0.9s infinite;
}
.projectorLight :nth-child(1){
    top: -15%;
    transform: rotate(-12deg);
}
.projectorLight :nth-child(2){
    bottom: -15%;
    transform: rotate(12deg);
}
/*****
.cover background must be the same as the page background.
*****/
.cover{
    position: absolute;
    background: rgb(0, 0, 0);
    height: 40%;
    width: 115%;
    left: -10%;
    opacity: 1;
}
@keyframes rot{
    0%{
        transform: rotate(0);
    }
    100%{
        transform: rotate(360deg);
    }
}
@keyframes light{
    0%{
        opacity: 0.8;
    }
    50%{
        opacity: 0;
    }
    100%{
        opacity: 0.8;
    }
}
</style>