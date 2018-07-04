<template>
  <div class="menu-sidebar">
    <template v-for="item in routes" v-if="!item.hidden">
      <router-link :to="item.path" v-if="item.children" :key="item.name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" class="submenu-title-noDropdown">
          <!-- <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon> -->
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>
      <router-link v-else :to="item.path" :key="item.name">
        <el-menu-item  :index="item.name||item.path" :key="item.name">
          <template slot="title">
            <!-- <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon> -->
            <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
          </template>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SideBarItem',
  props: {
    routes: {
      type: Array
    }
  }

}
</script>
