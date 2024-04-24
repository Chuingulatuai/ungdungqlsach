<script>
import { nhaXuatBanService } from '~/services/nhaXuatBan.service'

export default {
  data() {
    return {
      name: '',
      address: ''
    }
  },
  methods: {
    async handleCreate() {
      try {
        const res = await nhaXuatBanService.create({
          TENNXB: this.name,
          DIACHI: this.address
        })
        alert(res.message)
        this.clearValue()
      } catch (e) {
        alert('Thêm nhà xuât bản thất bại!')
      }
    },
    clearValue() {
      this.name = ''
      this.address = ''
    }
  },
  mounted() {
    document.title = 'Thêm mới nhà xuât bản'
  }
}
</script>
<template>
  <div class="container">
    <h2 class="py-2">Thêm nhà xuất bản</h2>
    <form @submit.prevent="handleCreate" action="" class="form-add-book">
      <small> tên nhà xuất bản </small>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Nhập tên nhà xuất bản" aria-label="Username"
          aria-describedby="basic-addon1" required v-model="name" />
      </div>

      <small> địa chỉ: </small>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Nhập địa chỉ" aria-label="Username"
          aria-describedby="basic-addon1" required v-model="address" />
      </div>

      <button type="submit" class="btn btn-primary w-25 py-2">Thêm</button>
    </form>
  </div>
</template>
<style lang="css" scoped>
@import url("~/pages/admin/book/admin.css");
</style>
