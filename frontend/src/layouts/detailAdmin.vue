<script>
import { useNhanVienStore } from '~/store/nhanVienStore'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      adminName: ''
    }
  },
  methods: {
    async getData() {
      const nhanVienStore = useNhanVienStore()
      if (nhanVienStore.nhanVien?._id) {
        await nhanVienStore.setInfo(nhanVienStore.nhanVien._id)
        if (nhanVienStore.nhanVien?.HoTenNV) {
          this.adminName = nhanVienStore.nhanVien.HoTenNV
        }
      }
    },
    logOut() {
      const nhanVienStore = useNhanVienStore()
      nhanVienStore.logout()
      this.$router.push({ name: "loginAdmin" })
    }
  },
  mounted() {
    this.getData()
  }
})
</script>
<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-5">
          <div class="logo">
            <h2>NguyenLibary</h2>
          </div>
        </div>
        <div class="col-7">
          <div class="name-admin">
            <img class="img-admin" src="../assets/images/img-admin.png" alt="" />
            <h3 class="name-admin-h3">{{ adminName }}</h3>
          </div>
        </div>
      </div>
    </div>
  </header>
  <main class="main">
    <div class="row">
      <div class="col-3">
        <div class="left-admin">
          <ul class="nav tab-admin">
            <li class="nav-item item-tab">
              <router-link to="/admin" class="nav-link">Quản lý sách</router-link>
            </li>
            <li class="nav-item item-tab">
              <router-link to="/adminaddbook" class="nav-link">Thêm sách</router-link>
            </li>
            <li class="nav-item item-tab">
              <router-link to="/adminproducer" class="nav-link">Quản lý nhà xuất bản</router-link>
            </li>
            <li class="nav-item item-tab">
              <router-link to="/adminproduceradd" class="nav-link">Thêm nhà xuất bản</router-link>
            </li>
            <li class="nav-item item-tab">
              <router-link to="/adminnv" class="nav-link">Thêm nhân viên</router-link>
            </li>

            <li class="nav-item item-tab">
              <router-link to="/adminBill" class="nav-link">Quản lý phiếu mượn</router-link>
            </li>
            <li class="nav-item item-tab">
              <span class="nav-link" @click="logOut" style="cursor: pointer;">Đăng xuất</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-9"><router-view /></div>
    </div>
  </main>
</template>

<style lang="css" scoped>
@import url("~/assets/css/detailAdmin.css");
</style>
