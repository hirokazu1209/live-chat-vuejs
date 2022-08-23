<template>
  <div>
    <h1>{{ title }}</h1>
    <!-- データを子コンポーネントに渡している -->
    <!-- :<props名>="<データの名前>" -->
    <!-- <TestComponent :isEnabled="isEnabled" message="コンポーネントにデータが渡されています" /> -->

    <!-- toggleという名前に一致する親コンポーネントのメソッドが実行される -->
    <!-- @toggleは子コンポーネントのthis.$emit('toggle')に紐づいている -->
    <!-- "toggle"はWelcome.vueのメソッド名であるtoggleに紐づいている -->
    <TestComponent @toggle="toggle" message="コンポーネントにデータが渡されています" />
    <p v-if="isEnabled">こんにちは</p>
  </div>
</template>

<script>
import TestComponent from '../components/TestComponent.vue'

export default {
  components: {
    TestComponent
  },
  data() {
    return {
      title: '初めてのVue.jsアプリです!',
      subtitle: 'ようこそ',
      isEnabled: true
    }
  },
  computed: {
    text() {
      if(this.isEnabled) {
        return 'こんにちは！'
      } else {
        return 'さよなら'
      }
    }
  },
  methods: {
    toggle() {
      this.isEnabled = !this.isEnabled
    }
  }
}
</script>

<style scoped>
  p {
    font-size: 20px;
    color: red;
  }
</style>