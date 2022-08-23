<template>
  <div>
    これはコンポーネントから表示されています。
    <p>{{ message }}</p>
    <!-- ボタンをクリックすると「onClick」メソッドが実行される -->
    <button @click="onClick">親メソッドを実行するボタン</button>
  </div>
</template>

<script>
export default {
  // 親コンポーネントから受け取るデータを定義する
  props: ['message'],
  methods: {
    onClick() {
      // 親コンポーネントのメソッドを実行することができる
      // this.$emit('メソッド名')の書き方
      this.$emit('toggle')
    }
  }
}
</script>
