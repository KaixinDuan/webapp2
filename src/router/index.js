import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      component: () => import("@/views/index/index"),
      meta: {
        title: "首页",
        // 缓存首页
        keepAlive: true
      }
    },
    {
      path: "/notice",
      component: () => import("@/views/notice/notice"),
      meta: {
        title: "通知公告",
      },
    },
    {
      name:'noticeDetail',
      path:'/notice/detail/:id',
      component:()=>import("@/views/notice/detail")
    },
    {
      path: "/volume",
      component: () => import("@/views/volume/index"),
      meta: {
        title: "执法宣传",
      }
    },
    {
      name:'volumeDetail',
      path:'/volume/detail/:id',
      component:()=>import("@/views/volume/detail")
    },
    {
      path: "/lawer",
      component: () => import("@/views/lawer/index"),
      meta: {
        title: "政策法规",
      },
    },
    {
      name:'lawerDetail',
      path:'/lawer/detail/:id',
      component:()=>import("@/views/lawer/detail")
    },
    {
      path: "/mapNavigation",
      component: () => import("@/views/mapNavigation/index"),
      meta: {
        title: "地图导航",
      },
    },
    {
      name:'QRsignIn',
      path: "/QRsignIn",
      component: () => import("@/views/QRsignIn/index"),
      meta: {
        title: "二维码签到",
      },
    },
    {
      name:'contact',
      path: "/contact",
      component: () => import("@/views/contact/index"),
      meta: {
        title: "通讯录",
      },
    },
    {
      name:'contactDetail',
      path: "/contact/detail/:id",
      component: () => import("@/views/contact/detail"),
      meta: {
        title: "通讯录",
      },
    },
    {
      path: "/caseAdd",
      component: () => import("@/views/case/add"),
      meta: {
        title: "案件上报",
      },
    },
    {
      name:'caseList',
      path:'/caseList',
      component:()=>import("@/views/case/index"),
      meta:{
        title:"案件"
      },
      
    },
    {
      path:'/caseDetail/:id',
      name:'caseDetail',
      component:()=>import("@/views/case/detail"),
    },
    {
      path: "/calendarSign",
      component: () => import("@/views/calendarSign/index"),
      meta: {
        title: "巡查签到",
      },
    },
    {
      name:'Inspection',
      path:'/inspection',
      component:()=>import("@/views/Inspection/index"),
      meta:{
        title:"道路巡查"
      },
        
    },
    {
      name:'inspectionAdd',
      path:'/inspection/Add',
      component:()=>import("@/views/Inspection/add")
    },
    {
      name:'inspectionDetail',
      path:'/inspection/detail/:id',
      component:()=>import("@/views/Inspection/detail")
    },
    {
      name:'Investigation',
      path:'/investigation',
      component:()=>import("@/views/Investigation/index"),
      meta:{
        title:"安全排查"
      },
        
    },
    {
      name:'InvestigationAdd',
      path:'/investigation/Add',
      component:()=>import("@/views/Investigation/add")
    },
    {
      name:'investigationDetail',
      path:'/investigation/Detail/:id',
      component:()=>import("@/views/Investigation/detail")
    },
    
    {
      path: "/my",
      name:"my",
      component: () => import("@/views/my/index"),
      redirect: "/my/center",
      children: [
        {
          path: "center",
          meta: {
            title: "个人中心"
          },
          component: () => import("@/views/my/children/center")
        },
        {
          path: "set",
          meta: {
            title: "设置"
          },
          component: () => import("@/views/my/children/set")
        }
      ]
    },
    {
      path: "/login",
      component: () => import("@/views/login/index"),
      meta: {
        title: "登陆"
      }
    },
    {
      path: "/regist",
      component: () => import("@/views/login/regist"),
      meta: {
        title: "注册"
      }
    },
    {
      path: "*",
      component: () => import("@/components/NotFound")
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   let { title, needLogin } = to.meta;
//   let { isLogin } = store.state;
//   document.title = title;

//   if (needLogin && !isLogin) {
//     next({
//       path: "/login"
//     });
//   } else {
//     next();
//   }
// });

export default router;
