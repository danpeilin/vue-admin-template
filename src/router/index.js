import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/commodity',
    component: Layout,
    redirect: '/commodity/add',
    name: 'commodity',
    meta: { title: '商品分类管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'add',
        name: 'Add',
        component: () => import('@/views/commodity/add/index'),
        meta: { title: '添加商品', icon: 'table' }
      },
      {
        path: 'examine',
        name: 'Examine',
        component: () => import('@/views/commodity/examine/index'),
        meta: { title: '查看商品', icon: 'tree' }
      }
    ]
  },
  {
    path: '/comparam',
    component: Layout,
    redirect: '/comparam/setsize',
    name: 'comparam',
    meta: { title: '基本参数管理 ', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/setsize',
        name: 'setsize',
        component: () => import('@/views/comparam/setsize/index'),
        meta: { title: '尺寸设置', icon: 'table' }
      },
      {
        path: '/setcolor',
        name: 'setcolor',
        component: () => import('@/views/comparam/setcolor/index'),
        meta: { title: '颜色设置', icon: 'tree' }
      },
    ]
  },
  {
    path: '/commanage',
    component: Layout,
    redirect: '/commanage/addcominfo',
    name: 'commanage',
    meta: { title: '商品管理 ', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/addcominfo',
        name: 'addcominfo',
        component: () => import('@/views/commanage/addcominfo/index'),
        meta: { title: '添加商品信息', icon: 'table' }
      },
      {
        path: '/selectcominfo',
        name: 'selectcominfo',
        component: () => import('@/views/commanage/selectcominfo/index'),
        meta: { title: '查看商品信息', icon: 'tree' },
      },
      {
        path: '/picmanage',
        name: 'picmanage',
        component: () => import('@/views/commanage/picmanage/index'),
        meta: { title: '商品图片管理', icon: 'tree' },
      },
      {
        path: '/colorsizecom',
        name: 'colorsizecom',
        component: () => import('@/views/commanage/colorsizecom/index'),
        meta: { title: '尺寸颜色管理', icon: 'tree' },
      },
      // {
      //   path: '/kucuncom',
      //   name: 'kucuncom',
      //   component: () => import('@/views/commanage/kucuncom/index'),
      //   meta: { title: '商品库存管理', icon: 'tree' },
      // },
    ]
  },
  {
    path: '/orderManagement',
    component: Layout,
    redirect: '/orderManagement/viewOrder',
    name: 'orderManagement',
    meta: { title: '订单管理', icon: 'el-icon-s-help' },
    alwaysShow: true,
    children: [
      {
        path: '/viewOrder',
        name: 'viewOrder',
        component: () => import('@/views/orderManagement/viewOrder/index'),
        meta: { title: '查看订单信息', icon: 'table' },
      }
    ]
  },
  {
    path: '/comuser',
    component: Layout,
    redirect: '/comuser/adduser',
    name: 'comuser',
    meta: { title: '用户管理 ', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/adduser',
        name: 'adduser',
        component: () => import('@/views/comuser/adduser/index'),
        meta: { title: '添加用户信息', icon: 'table' }
      },
      {
        path: '/selectuser',
        name: 'selectuser',
        component: () => import('@/views/comuser/selectuser/index'),
        meta: { title: '查看用户信息', icon: 'tree' }
      },
    ]
  },
  

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
