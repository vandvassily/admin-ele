<!--父组件中引入子组件-->
<template>
  <div>
    <a href="javascript:;" @click="$store.dispatch('switchDialog')">点击</a>
    <t-dialog></t-dialog>
  </div>
</template>

<script>
import dialog from '../../components/dialog.vue'
export default {
  // data () {
  //   return {
  //     show: false,
  //     lala: false
  //   }
  // },
  components: {
    't-dialog': dialog
  }
}
</script>
