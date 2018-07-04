<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :router="false"
    >
      <side-bar-item :routes="routes"></side-bar-item>
    </el-menu>
  </el-scrollbar>

</template>

<script>
import { mapGetters } from 'vuex'
import SideBarItem from './SideBarItem'

export default {
  components: { SideBarItem },
  computed: {
    ...mapGetters([
      'routes'
    ])
  },
  watch: {
    route: function (newVal, oldVal) {
      console.log(newVal)
    }
  },
  created () {
  }
}
</script>
