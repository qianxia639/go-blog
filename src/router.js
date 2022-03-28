import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//     }
//   ]
// })
const routes = [
  {
    path: '/',
    redirect: '/index',
    title: '首页'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/example/Index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/example/Blog.vue'),
    meta: {
      title: '博客详情'
    }
  },
  {
    path: '/types',
    name: 'Types',
    component: () => import('@/views/example/Types.vue'),
    meta: {
      title: '分类'
    }
  },
  {
    path: '/archives',
    name: 'Archives',
    component: () => import('@/views/example/Archives.vue'),
    meta: {
      title: '归档'
    }
  },
  {
    path: '/account/login',
    name: 'Login',
    component: () => import('@/views/system/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/account/register',
    name: 'Register',
    component: () => import('@/views/system/Register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/blogs/blogInput',
    name: 'BlogInput',
    component: () => import('@/views/example/admin/BlogInput.vue'),
    meta: {
      title: '博客发布'
    }
  },
  {
    path: '/blogs/blogList',
    name: 'BlogList',
    component: () => import('@/views/example/admin/BlogList.vue'),
    meta: {
      title: '博客列表'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/system/About.vue'),
    meta: {
      title: '关于'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/system/Search.vue'),
    meta: {
      title: '搜索详情'
    }
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const isLogin = storageService.get(storageService.USER_TOKEN)
//   if (to.path == '/account/login' || to.path == '/account/register' || to.path == '/types' || to.path == '/index') {
//     next();
//   } else {
//     isLogin ? next() : next('/account/login')
//   }
// })
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router