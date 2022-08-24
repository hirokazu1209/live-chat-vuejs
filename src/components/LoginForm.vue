<template>
  <div>
    <h2>ログイン</h2>
    <form @submit.prevent="login">
      <!-- データと入力フォームを生成している -->
      <input type="email" required placeholder="メールアドレス" v-model="email">
      <input type="password" required placeholder="パスワード" v-model="password">
      <div class="error">{{ error }}</div>
      <button>ログインする</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import setItem from '../auth/setItem'

export default{
  emits: ['redirectToChatRoom'],
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        this.error = null

        const res = await axios.post('http://localhost:3000/auth/sign_in', {
          email: this.email,
          password: this.password
        }
      )
      if(!res) {
        throw new Error('メールアドレスかパスワードが違います')
      }

      console.log({res})

      if(!this.error) {
        // ローカルストレージの情報を保存する記述
        // キーの名前にハイフンが含まれると.でアクセス出来ないため['access-token']としている
        // window.localStorage.setItem('access-token', res.headers['access-token'])
        // window.localStorage.setItem('client', res.headers.client)
        // window.localStorage.setItem('uid', res.headers.uid)
        // 上記3つはheaderにアクセスする。nameはレスポンスのデータの中に含まれる
        // window.localStorage.setItem('name', res.data.data.name)

        // 上記、setItemで共通化したためコメントアウト
        setItem(res.headers, res.data.data.name)
        this.$emit('redirectToChatRoom')
      }

      this.error = null

      return res
      } catch(error) {
        console.log({error})
        this.error = 'メールアドレスかパスワードが違います'
      }
    }
  }
}
</script>
