<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
  position: relative;
  /* text-align: center; */
  /* color: #2c3e50; */
}

/* 隐藏滚动条 */
::-webkit-scrollbar{
  display:none;
}
</style>
