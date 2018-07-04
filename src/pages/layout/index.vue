<template>
  <el-container>
    <el-aside width="auto" style="background-color: #545c64">
      <!-- <el-menu default-active="1-1-1" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu> -->
      <sidebar class="sidebar-container"></sidebar>
    </el-aside>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </el-container>
</template>

<script>
import Sidebar from './components/SideBar'
import AppMain from './components/AppMain'
import Navbar from './components/NavBar'
export default {
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(30).fill(item),
      isCollapse: false
    }
  },
  components: {
    Sidebar,
    AppMain,
    Navbar
  },
  methods: {
    changeMenuCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.sidebar-collapse {
  width: 60px;
  height: 60px;
  position: relative;
  float: left;
  text-align: center;
  font-size: 18px;
}

.el-aside {
  color: #333;
}

.el-container {
  height: 100%;
  display: flex;
}

.el-container a{
  text-decoration: none
}

.main-container{
  flex: 1;
  height: 100%;
}

aside{
  height: 100%;
}
</style>
