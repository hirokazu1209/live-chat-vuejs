<template>
  <div class="container">
    <Navbar />
    <ChatWindow @connectCable="connectCable" :messages="formattedMessages" ref="chatWindow" />
    <NewChatForm @connectCable="connectCable"/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import ChatWindow from '../components/ChatWindow.vue'
import NewChatForm from '../components/NewChatForm.vue'
import axios from 'axios'
import ActionCable from 'actioncable'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'

export default {
  components: { Navbar, ChatWindow, NewChatForm },
  data() {
    return {
      messages: []
    }
  },
  computed: {
    formattedMessages() {
      if(!this.messages.length){ return[] }
      return this.messages.map(message => {
        let time = formatDistanceToNow(new Date(message.created_at), { locale: ja })
        return { ...message, created_at: time }
      })
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
    // 子コンポーネントからmessageデータが引数として渡される
    connectCable(message){
      // this.messageChannelと接続し、Ruby on Railsのreceiveメソッドを実行するように指定
      this.messageChannel.perform('receive', {
        message: message,
        email: window.localStorage.getItem('uid')
      })
    }
  },
  mounted() {
    // Ruby on RailsのAction Cableとコネクションを確立している部分
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
    this.messageChannel = cable.subscriptions.create('RoomChannel', {
      connected: () => {
        this.getMessages().then(() => {
          this.$refs.chatWindow.scrollToBottom()
        })
      },
      // Ruby on RailsのAction Cableから何らかのデータが送られてきた時に実行するメソッドを記述
      received: () => {
        this.getMessages().then(() => {
          this.$refs.chatWindow.scrollToBottom()
        })
      }
    })
  },
  // コネクションを削除（ページを移動したり、ブラウザを閉じる時に実行）
  beforeUnmount() {
    this.messageChannel.unsubscribe()
  }
}
</script>

<style scoped>
</style>