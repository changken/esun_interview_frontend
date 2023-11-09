<script setup>

</script>

<template>
  <div class="container">
    <nav class="mt-2">
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <router-link to="/" class="nav-link active" aria-current="page" >列出偏好金融商品</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link">新增偏好金融商品</router-link>
        </li>
        <li>
          <router-link to="/adduser" class="nav-link">新增使用者</router-link>
        </li>
        <li>
          <router-link to="/addproduct" class="nav-link">新增金融商品</router-link>
        </li>
        <!--<li class="nav-item">
          <router-link to="/update" class="nav-link">更新偏好金融商品</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/delete" class="nav-link">刪除偏好金融商品</router-link>
        </li>
         <li class="nav-item">
          <router-link to="/query" class="nav-link">查詢偏好金融商品</router-link>
        </li> -->
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
/* .container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
} */
</style>
