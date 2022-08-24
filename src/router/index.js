import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome'
import Chatroom from '../views/Chatroom'
import useValidate from '../auth/validate'

const { error, validate } = useValidate()
const requireAuth = async(to, from, next) => {
  const uid = window.localStorage.getItem('uid')
  const client = window.localStorage.getItem('client')
  const accessToken = window.localStorage.getItem('accessToken')

  if(!uid || !client || !accessToken) {
    console.log('ログインしていません')
    next({ name: 'Welcome' })
    return
  }

  await validate()

  // beforeAuthで呼ばれるメソッドは、nextメソッドの実行が必ず必要のため記述
  if(error.value) {
    console.log('認証に失敗しました')
    next({ name: 'Welcome' })
  } else {
    next()
  }
}

const noRequireAuth = async(to, from, next) => {
  const uid = window.localStorage.getItem('uid')
  const client = window.localStorage.getItem('client')
  const accessToken = window.localStorage.getItem('accessToken')

  if(!uid && !client && !accessToken ) {
    next()
    return
  }

  await validate()

  if(!error.value) {
    next({ name: 'Chatroom' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: noRequireAuth
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom,
    // ルートにアクセスする前に実行されるメソッド
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
