import Vue from 'vue'
import Router from 'vue-router'
import {
  Message
} from 'element-ui'

import Login from '@/pages/login/index.vue' // 登录页
import SignIn from '@/pages/signIn/index.vue' // 注册
import SignInSuc from '@/pages/signIn/success.vue' // 注册
import ForgetPwd from '@/pages/forgetPwd/index.vue' // 忘记密码
import ResetPwd from '@/pages/forgetPwd/resetPwd.vue' // 邮箱验证改密码
import Layout from '@/components/layout/index.vue'// 整体布局
import clubHome from '@/pages/home/clubHome.vue'// 俱乐部首页
import sysHome from '@/pages/home/sysHome.vue'// 管理员首页
import ClubManage from '@/pages/member/club/index.vue' // 会员管理 俱乐部管理
import ClubAdd from '@/pages/member/club/add.vue' // 会员管理 俱乐部管理新增
import ClubmemRec from '@/pages/member/club/memRec.vue' // 会员管理 俱乐部管理 人员流动记录
import SportManage from '@/pages/member/sport/index.vue' // 会员管理 运动员新增
import SportAdd from '@/pages/member/sport/add.vue' // 会员管理 运动员新增
import SportRecord from '@/pages/member/sport/record.vue' // 会员管理 运动员管理 转会处罚记录
import AllRecord from '@/pages/member/sport/allRecord.vue'// 俱乐部管理员 运动员流动记录

import TypeManage from '@/pages/game/type/index.vue' // 联赛 联赛类别
import GameManage from '@/pages/game/gameManage/index.vue' // 联赛 赛事管理
import GameAdd from '@/pages/game/gameManage/add.vue' // 联赛 赛事管理 新增
import GameScore from '@/pages/game/gameManage/score.vue' // 联赛 赛事管理 比赛成绩维护
import OrderBook from '@/pages/game/gameManage/order.vue' // 联赛 赛事管理 比赛成绩维护
import RegisterManage from '@/pages/game/registerManage/index.vue' // 联赛 报名管理
import ApprovalEnroll from '@/pages/game/registerManage/approval.vue' // 联赛 报名管理

import GroupTypeManage from '@/pages/group/type/index.vue' // 联赛 联赛类别
import GroupGameManage from '@/pages/group/gameManage/index.vue' // 活动 赛事管理
import GroupGameAdd from '@/pages/group/gameManage/add.vue' // 活动 赛事管理 新增
import GroupGameScore from '@/pages/group/gameManage/score.vue' // 活动 赛事管理 比赛成绩维护
import GroupOrderBook from '@/pages/group/gameManage/order.vue' // 活动 赛事管理 比赛成绩维护
import GroupRegisterManage from '@/pages/group/registerManage/index.vue' // 活动 报名管理
import GroupApprovalEnroll from '@/pages/group/registerManage/approval.vue' // 活动 报名管理

import JudgeManage from '@/pages/judge/index.vue' // 裁判管理
import JudgeAdd from '@/pages/judge/add.vue' // 裁判管理新增
import JudgeRecord from '@/pages/judge/record.vue' // 裁判执裁和处罚记录
import NotifyManage from '@/pages/notify/index.vue' // 通知管理
import NotifyAdd from '@/pages/notify/add.vue' // 新增通知
import NotifySys from '@/pages/notify/notifysys.vue' // 系统通知查看
import Notifyother from '@/pages/notify/notifyother.vue' // 赛事通知其他
import Notifyobok from '@/pages/notify/notifyorderbook.vue' // 赛事通知秩序册
import Notifyscore from '@/pages/notify/notifyscore.vue' // 赛事通知成绩单

import dataSta from '@/pages/dataStatistics/index.vue' // 数据统计
import gametypeList from '@/pages/dataMaintance/game/index.vue' // 比赛项目列表
import gametypeAdd from '@/pages/dataMaintance/game/add.vue' // 比赛项目添加
import systemDateList from '@/pages/dataMaintance/system/index.vue' // 系统参数列表
import systemDateEdit from '@/pages/dataMaintance/system/add.vue' // 系统参数编辑
import refereeList from '@/pages/dataMaintance/referee/index.vue' // 裁判类型列表
import refereeAdd from '@/pages/dataMaintance/referee/add.vue' // 裁判类型添加

import User from '@/pages/system/user/userIndex.vue' // 系统管理 用户管理
import UserAdd from '@/pages/system/user/userAdd.vue' // 系统管理 用户管理
import Role from '@/pages/system/role/roleIndex.vue' // 系统管理 角色管理
import RoleAdd from '@/pages/system/role/roleAdd.vue' // 系统管理 角色管理

import GameEnroll from '@/pages/gameEnroll/index.vue' // 俱乐部 赛事报名
import ClubEnroll from '@/pages/gameEnroll/enroll.vue' // 俱乐部 赛事报名

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      hidden: true
    },

    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn,
      hidden: true
    },
    {
      path: '/SignInSuc',
      name: 'SignInSuc',
      component: SignInSuc,
      hidden: true
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: ForgetPwd,
      hidden: true
    },
    {
      path: '/resetPwd',
      name: 'resetPwd',
      component: ResetPwd,
      hidden: true
    },
    {
      path: '/',
      // redirect: '/home',
      hidden: true
    },

    // 系统管理员首页
    {
      path: '/home',
      level: 1,
      component: Layout,
      children: [
        {
          path: 'index',
          component: sysHome,
          name: 'home',
          meta: {title: '首页'}
        }
      ]
    },
    // 俱乐部首页
    {
      path: '/clubhome',
      level: 1,
      component: Layout,
      children: [
        {
          path: 'index',
          component: clubHome,
          name: 'clubhome',
          meta: {title: '首页'}
        }
      ]
    },
    {
      path: '/clubsport',
      level: 1,
      component: Layout,
      children: [{
        path: 'index',
        component: SportManage,
        name: 'clubsport-manage',
        meta: {title: '运动员管理'}
      },
      {path: 'record', hidden: true, component: SportRecord, name: 'clubsport-record'},
      {path: 'add', hidden: true, component: SportAdd, name: 'clubsport-add'},
      {path: 'edit', hidden: true, component: SportAdd, name: 'clubsport-edit'},
      {path: 'allrecord', hidden: true, component: AllRecord, name: 'all-record'}
      ]
    },
    {
      path: '/gameenroll',
      level: 1,
      component: Layout,
      children: [{
        path: 'index',
        component: GameEnroll,
        name: 'club-gameenroll',
        meta: {title: '赛事报名'}
      },
      {path: 'clubenroll', hidden: true, component: ClubEnroll, name: 'club-enroll'},
      {path: 'gameinfo', hidden: true, component: GameAdd, name: 'game-info'},
      {path: 'groupinfo', hidden: true, component: GroupGameAdd, name: 'group-info'}
      ]
    },
    {
      path: '/member',
      component: Layout,
      level: 2,
      redirect: 'noredirect',
      name: 'member',
      meta: {
        title: '会员中心'
      },
      children: [
        {path: 'club', component: ClubManage, name: 'club-manage', meta: { title: '俱乐部管理' }},
        {path: 'sport', component: SportManage, name: 'sport-manage', meta: { title: '运动员管理' }},
        {path: 'clubadd', hidden: true, component: ClubAdd, name: 'club-add'},
        {path: 'clubedit', hidden: true, component: ClubAdd, name: 'club-edit'},
        {path: 'clubmemRec', hidden: true, component: ClubmemRec, name: 'club-memRec'},
        {path: 'sportrecord', hidden: true, component: SportRecord, name: 'sport-record'},
        {path: 'sportadd', hidden: true, component: SportAdd, name: 'sport-add'},
        {path: 'sportedit', hidden: true, component: SportAdd, name: 'sport-edit'}
      ]
    },
    {
      path: '/game',
      component: Layout,
      level: 2,
      redirect: 'noredirect',
      name: 'game',
      meta: {
        title: '联赛'
      },
      children: [
        {path: 'type', component: TypeManage, name: 'type-manage', meta: { title: '联赛类别' }},
        {path: 'gameManage', component: GameManage, name: 'game-manage', meta: { title: '赛事管理' }},
        {path: 'gameadd', hidden: true, component: GameAdd, name: 'game-add'},
        {path: 'gameedit', hidden: true, component: GameAdd, name: 'game-edit'},
        {path: 'gamescore', hidden: true, component: GameScore, name: 'game-score'},
        {path: 'orderbook', hidden: true, component: OrderBook, name: 'order-book'},
        {path: 'registerManage', component: RegisterManage, name: 'register-manage', meta: { title: '报名管理' }},
        {path: 'approvalenroll', hidden: true, component: ApprovalEnroll, name: 'approval-enroll'}
      ]
    },
    {
      path: '/group',
      component: Layout,
      level: 2,
      redirect: 'noredirect',
      name: 'group',
      meta: {
        title: '群体活动'
      },
      children: [
        {path: 'type', component: GroupTypeManage, name: 'grouptype-manage', meta: { title: '活动类别' }},
        {path: 'gameManage', component: GroupGameManage, name: 'groupgame-manage', meta: { title: '赛事管理' }},
        {path: 'gameadd', hidden: true, component: GroupGameAdd, name: 'groupgame-add'},
        {path: 'gameedit', hidden: true, component: GroupGameAdd, name: 'groupgame-edit'},
        {path: 'gamescore', hidden: true, component: GroupGameScore, name: 'groupgame-score'},
        {path: 'orderbook', hidden: true, component: GroupOrderBook, name: 'grouporder-book'},
        {path: 'registerManage', component: GroupRegisterManage, name: 'groupregister-manage', meta: { title: '报名管理' }},
        {path: 'approvalenroll', hidden: true, component: GroupApprovalEnroll, name: 'groupapproval-enroll'}
      ]
    },
    {
      path: '/judge',
      level: 1,
      component: Layout,
      children: [
        {
          path: 'index',
          component: JudgeManage,
          name: 'judge-manage',
          meta: {title: '裁判管理'}
        },
        {path: 'judgerecord', hidden: true, component: JudgeRecord, name: 'judge-record'},
        {path: 'judgeadd', hidden: true, component: JudgeAdd, name: 'judge-add'},
        {path: 'judgeedit', hidden: true, component: JudgeAdd, name: 'judge-edit'},
        {path: 'personInfo', hidden: true, component: JudgeAdd, name: 'judge-edit'}
      ]
    },
    {
      path: '/notify',
      level: 1,
      component: Layout,
      children: [{
        path: 'index',
        component: NotifyManage,
        name: 'notify',
        meta: {title: '通知管理'}
      },
      {
        path: 'add',
        component: NotifyAdd,
        name: 'notify-add',
        meta: {title: '新增通知'},
        hidden: true
      },
      {
        path: 'systeminfo',
        component: NotifySys,
        name: 'notify-system',
        meta: {title: '系统通知'},
        hidden: true
      },
      {
        path: 'other',
        component: Notifyother,
        name: 'notify-other',
        meta: {title: '赛事通知'},
        hidden: true
      },
      {
        path: 'orderbook',
        component: Notifyobok,
        name: 'notify-orderbook',
        meta: {title: '赛事通知'},
        hidden: true
      },
      {
        path: 'score',
        component: Notifyscore,
        name: 'notify-score',
        meta: {title: '赛事通知'},
        hidden: true
      }
      ]
    },
    {
      path: '/dataSta',
      level: 1,
      component: Layout,
      children: [{
        path: 'index',
        component: dataSta,
        name: 'dataSta',
        meta: {title: '数据统计'}
      }
      ]
    },
    {
      path: '/dataManage',
      component: Layout,
      level: 2,
      name: 'dataManage',
      meta: {
        title: '基础数据维护'
      },
      children: [
        {
          path: 'gametype',
          name: 'gametype',
          component: gametypeList,
          meta: {title: '比赛项目'}
        },
        {
          path: 'gametypeAdd',
          name: 'gametypeAdd',
          component: gametypeAdd,
          meta: {title: '新建赛事类型'},
          hidden: true
        },
        {
          path: 'systemDate',
          name: 'systemDate',
          component: systemDateList,
          meta: {title: '系统参数'}
        },
        {
          path: 'systemDateEdit',
          name: 'systemDateEdit',
          component: systemDateEdit,
          meta: {title: '编辑系统参数'},
          hidden: true
        },
        {
          path: 'refereetype',
          name: 'refereetype',
          component: refereeList,
          meta: {title: '裁判类型'}
        },
        {
          path: 'refereeTAdd',
          name: 'refereeTAdd',
          component: refereeAdd,
          meta: {title: '裁判类型管理'},
          hidden: true
        }
      ]
    },
    {
      path: '/system',
      component: Layout,
      level: 2,
      redirect: 'noredirect',
      name: 'system',
      meta: {
        title: '系统管理'
      },
      children: [
        {
          path: 'user',
          name: 'user',
          component: User,
          meta: {title: '用户管理'}
        },
        {
          path: 'userAdd',
          name: 'userAdd',
          component: UserAdd,
          meta: {title: '新增用户'},
          hidden: true
        },
        {
          path: 'role',
          name: 'role',
          component: Role,
          meta: {title: '角色管理'}
        },
        {
          path: 'roleAdd',
          name: 'roleAdd',
          component: RoleAdd,
          meta: {title: '新增角色'},
          hidden: true
        }
      ]
    }
  ]
})

router.beforeEach((to, form, next) => {
  const filterRoutes = ['/login', '/signIn', '/forgetPwd', '/resetPwd', '/SignInSuc']
  const clubRoutes = ['/clubhome/index', '/clubsport/index', '/gameenroll/index', '/gameenroll/clubenroll']
  const judgeRoutes = ['/judge/personInfo', '/judge/judgerecord', '/judge/index', '/judge/judgeadd']
  const clubadminRoutes = ['/notify/systeminfo', '/notify/orderbook', '/notify/score', '/notify/other', '/clubsport/add', '/clubsport/edit', '/clubsport/record', '/clubsport/allrecord', '/gameenroll/gameinfo', '/gameenroll/groupinfo']
  if (localStorage.getItem('token') || filterRoutes.indexOf(to.path) !== -1) {
    if (localStorage.user !== undefined && to.path === '/') {
      // 若没有输入链接 只输入域名 重定向到第一个菜单的链接
      next(JSON.parse(localStorage.user).resourceList[0].url)
    } else if (localStorage.user && JSON.parse(localStorage.user).clubId !== null) {
      // 俱乐部后台
      if (clubRoutes.indexOf(to.path) !== -1 || clubadminRoutes.indexOf(to.path) !== -1 || filterRoutes.indexOf(to.path) !== -1) {
        next()
      } else {
        Message({
          message: '您还没有权限，请重新登录！',
          type: 'warning'
        })
        next('/login')
        // next(JSON.parse(localStorage.user).resourceList[0].url)
      }
    } else if (localStorage.user && JSON.parse(localStorage.user).refereeId !== null) {
      // 裁判后台
      if (judgeRoutes.indexOf(to.path) !== -1 || filterRoutes.indexOf(to.path) !== -1) {
        next()
      } else {
        Message({
          message: '您还没有权限，请重新登录！',
          type: 'warning'
        })
        next('/login')
        // next(JSON.parse(localStorage.user).resourceList[0].url)
      }
    } else {
      // 管理员后台
      if (clubRoutes.indexOf(to.path) !== -1) {
        // next(JSON.parse(localStorage.user).resourceList[0].url)
        Message({
          message: '您还没有权限，请重新登录！',
          type: 'warning'
        })
        next('/login')
      } else {
        next()
      }
    }
  } else {
    next('/login')
  }
})
export default router
