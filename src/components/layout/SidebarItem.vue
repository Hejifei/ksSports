<template>
  <div>
    <template v-for="item in routes">
      <el-menu-item class="textleft" v-if="item.type === '2'" :index="item.url" :key="item.id">
          <img class="menuimg" :src="'/static/img/'+item.icon"/>
          <span>{{item.name}}</span>
      </el-menu-item>
      <el-submenu class="textleft" v-else :index="item.name" :key="item.id">
        <template slot="title">
          <img class="menuimg" :src="'/static/img/'+item.icon"/>
          <span>{{item.name}}</span>
        </template>

        <template v-for="child in item.nodes">
            <el-menu-item :index="child.url" :key="child.id">
              <span>{{child.name}}</span>
            </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name:'SidebarItem',
  props:{
    routes:{
      type:Array
    }
  }
  
    
}
</script>
<style scoped>
.menuimg{max-width: 20px;max-height: 20px;}
</style>

