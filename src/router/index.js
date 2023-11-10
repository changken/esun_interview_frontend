import { createRouter, createWebHistory } from 'vue-router';

import CreateLikeList from '../mycomponents/CreateLikeList.vue'
import UpdateLikeList from '../mycomponents/UpdateLikeList.vue'
import DeleteLikeList from '../mycomponents/DeleteLikeList.vue'
import QueryLikeList from '../mycomponents/QueryLikeList.vue'
import ListLikeList from '../mycomponents/ListLikeList.vue'

import AddUserForm from '../mycomponents/AddUserForm.vue';
import AddProductForm from '../mycomponents/AddProductForm.vue';
import UpdateProductForm from '../mycomponents/UpdateProductForm.vue';


// 1. 定义路由组件.
// 也可以从其他文件导入


// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', name: 'list', component: ListLikeList },
  { path: '/create', name: 'create', component: CreateLikeList },
  { path: '/update/:id', name: 'update', component: UpdateLikeList, props: true},
  { path: '/delete/:id', name: 'delete', component: DeleteLikeList, props: true},
  { path: '/query:id', name: 'query', component: QueryLikeList, props: true},
  { path: '/adduser', name: 'adduser', component: AddUserForm, props: true},
  { path: '/addproduct', name: 'addproduct', component: AddProductForm, props: true},
  { path: '/updateproduct/:id', name: 'updateproduct', component: UpdateProductForm, props: true},
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // `routes: routes` 的缩写
});

// // 5. 创建并挂载根实例
// const app = Vue.createApp({})
// //确保 _use_ 路由实例使
// //整个应用支持路由。
// app.use(router)

// app.mount('#app')

// // 现在，应用已经启动了！

export default router
