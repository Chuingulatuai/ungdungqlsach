<script>
import { docGiaService } from '~/services/docGia.service';

export default {
  data() {
    return {
      phone: '',
      firstName: '',
      address: '',
      password: '',
      passwordSub: '',
      lastName: ''
    }
  },
  methods: {
    async handleRegister() {
      try {
        if (this.password === this.passwordSub) {
          const res = await docGiaService.register({
            HOLOT: this.lastName,
            TEN: this.firstName,
            DIACHI: this.address,
            DIENTHOAI: this.phone,
            MATKHAU: this.password
          })

          alert(res?.message)
          this.clearData()
          this.$router.push({ name: "login" })
        } else {
          alert('Mật khẩu không khớp nhau!')
        }
      } catch (e) {
        alert('Đăng ký thất bại. Vui lòng thử lại sau!')
      }
    },
    clearData() {
      this.lastName = ''
      this.firstName = ''
      this.address = ''
      this.phone = ''
      this.password = ''
      this.passwordSub = ''
    }
  },
  mounted() {
    document.title = 'Đăng ký'
  }
}
</script>
<template>
  <div class="form-body">
    <div class="body-form">
      <h2 class="py-3 title-form">Đăng ký</h2>
      <form class="form" @submit.prevent="handleRegister">
        <div class="group-input">
          <label class="name-input">nhập số điện thoại</label>
          <input required class="input-login" type="text" placeholder="nhập số điện thoại" v-model="phone" />
        </div>
        <div class="group-input">
          <label class="name-input">tên</label>
          <input required class="input-login" type="text" placeholder="tên" v-model="firstName" />
        </div>
        <div class="group-input">
          <label class="name-input">họ lót</label>
          <input required class="input-login" type="text" placeholder="họ lót" v-model="lastName" />
        </div>
        <div class="group-input">
          <label class="name-input">địa chỉ</label>
          <input required class="input-login" type="text" placeholder="địa chỉ" v-model="address" />
        </div>
        <div class="group-input">
          <label class="name-input">nhập mật khẩu</label>
          <input required class="input-login" type="password" placeholder="nhập mật khẩu" v-model="password" />
        </div>
        <div class="group-input">
          <label class="name-input">nhập lại mật khẩu</label>
          <input required class="input-login" type="password" placeholder="nhập lại mật khẩu" v-model="passwordSub" />
        </div>
        <button class="btn btn-primary button-form" type="submit">
          đăng ký
        </button>
      </form>
      <p>Bạn đã có tài khoản?</p>
      <router-link to="/login" class="dieuhuong">đăng nhập ngay</router-link>
    </div>
  </div>
</template>
<style lang="css" scoped>
@import url("~/pages/form.css");
</style>
