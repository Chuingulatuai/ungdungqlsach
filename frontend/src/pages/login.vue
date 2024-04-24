<script>
import { useDocGiaStore } from '~/store/docGiaStore'
import { useNhanVienStore } from '~/store/nhanVienStore'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      phone: '',
      password: '',
      isUser: window.location.href.indexOf('admin') === -1
    }
  },
  methods: {
    async handleLogin() {
      if (this.isUser) {
        const docGiaStore = useDocGiaStore()
        await docGiaStore.login(this.password, this.phone)
        if (docGiaStore.docGia?._id) {
          this.$router.push({ name: "home" })
        }
      } else {
        const nhanVienStore = useNhanVienStore()
        await nhanVienStore.login(this.password, this.phone)
        if (nhanVienStore.nhanVien?._id) {
          this.$router.push({ name: "admin" })
        }
      }
    },
  },
  mounted() {
    document.title = 'Đăng nhập'
  }
})

</script>
<template>
  <div class="form-body">
    <div class="body-form">
      <h2 class="py-3 title-form">Đăng Nhập</h2>
      <form class="form" @submit.prevent="handleLogin">
        <div class="group-input">
          <label class="name-input">nhập số điện thoại</label>
          <input required class="input-login" type="text" placeholder="nhập số điện thoại" v-model="phone" />
        </div>
        <div class="group-input">
          <label class="name-input">nhập mật khẩu</label>
          <input required class="input-login" type="password" placeholder="nhập mật khẩu" v-model="password" />
        </div>
        <button class="btn btn-primary button-form" type="submit">
          đăng nhập
        </button>
      </form>
      <p>Bạn chưa có tài khoản?</p>
      <router-link to="/register" class="dieuhuong">đăng ký ngay</router-link>
    </div>
  </div>
</template>
<style lang="css" scoped>
@import url("~/pages/form.css");
</style>
