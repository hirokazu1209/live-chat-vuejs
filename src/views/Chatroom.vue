<template>
  <div class="container">
    <Navbar />
    <ChatWindow :messages="messages" />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import ChatWindow from '../components/ChatWindow.vue'

import axios from 'axios' 

export default {
  components: { Navbar, ChatWindow },
  data() {
    return {
      messages: []
    }
  },
  methods: {
    async getMessages() {
      try {
        const res = await axios.get('http://localhost:3000/messages', {
          headers: {
            uid: window.localStorage.getItem('uid'),
            "access-token": window.localStorage.getItem('access-token'),
            client: window.localStorage.getItem('client')
          }
        })
        if(!res) {
          new Error('メッセージ一覧を取得できませんでした')
        }
        // レスポンス内のdataにmessagesが入っているため、this.messagesにres.dataを代入
        this.messages = res.data
      } catch(err) {
        console.log(err)
      }
    },
  },
  mounted() {
    this.getMessages()
  },
}
</script>

<style scoped>
</style>