import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"
// import './assets/main.css'

import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import CreateLikeList from './mycomponents/CreateLikeList.vue'
import UpdateLikeList from './mycomponents/UpdateLikeList.vue'
import DeleteLikeList from './mycomponents/DeleteLikeList.vue'
import QueryLikeList from './mycomponents/QueryLikeList.vue'
import ListLikeList from './mycomponents/ListLikeList.vue'

axios.defaults.baseURL = 'http://localhost:8081'

// 1. 定义路由组件.
// 也可以从其他文件导入


// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', component: ListLikeList },
  { path: '/create', component: CreateLikeList },
  { path: '/update/:id', component: UpdateLikeList, props: true},
  { path: '/delete/:id', component: DeleteLikeList, props: true},
  { path: '/query:id', component: QueryLikeList, props: true},
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});

// // 5. 创建并挂载根实例
// const app = Vue.createApp({})
// //确保 _use_ 路由实例使
// //整个应用支持路由。
// app.use(router)

// app.mount('#app')

// // 现在，应用已经启动了！

createApp(App).use(router).mount('#app')

