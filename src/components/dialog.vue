<template>
  <el-dialog :visible.sync="$store.state.dialog.show">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$store.state.dialog.show = false">取 消</el-button>
      <el-button type="primary" @click="$store.state.dialog.show = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  // props: ['show', 'lala'],
  // computed: {
  //   currentShow: {
  //     get () {
  //       return this.show
  //     },
  //     set (val) {
  //       this.$emit('update:show', val)
  //     }
  //   }
  // }
}
</script>
