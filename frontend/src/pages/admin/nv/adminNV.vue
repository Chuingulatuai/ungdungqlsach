<script>
import { nhanVienService } from '~/services/nhanVien.service';

export default {
  data() {
    return {
      tenNV: '',
      address: '',
      phone: '',
      role: 'Quản Lý',
      password: ''
    }
  },
  methods: {
    async handleRegister() {
      try {
        const res = await nhanVienService.create({
          HoTenNV: this.tenNV,
          Password: this.password,
          ChucVu: this.role,
          DiaChi: this.address,
          SoDienThoai: this.phone
        })
        alert(res.message)
        this.clearValue()
      } catch (e) {
        alert('Thêm mới nhân viên thất bại!')
      }
    },
    clearValue() {
      this.tenNV = ''
      this.address = ''
      this.phone = ''
      this.role = ''
      this.password = 'Quản Lý'
    }
  },
  mounted() {
    document.title = 'Thêm mới nhân viên'
  }
}
</script>
<template>
  <div class="container">
    <h2 class="py-2">Thêm nhân viên</h2>
    <form @submit.prevent="handleRegister" action="" class="form-add-book">
      <small> họ tên nhân viên: </small>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Nhập tên admin" aria-label="Username"
          aria-describedby="basic-addon1" required v-model="tenNV" />
      </div>

      <small> nhập địa chỉ: </small>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Nhập địa chỉ" aria-label="Username"
          aria-describedby="basic-addon1" required v-model="address" />
      </div>
      <small> nhập số điện thoại nhân viên: </small>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Nhập số điện thoại nhân viên" aria-label="Username"
          aria-describedby="basic-addon1" required v-model="phone" />
      </div>

      <div class="group-input-row mb-3">
        <div class="row">
          <div class="col-8">
            <small> nhập mật khẩu: </small>
            <div class="input-group mb-3">
              <input type="password" class="form-control" placeholder="Nhập nhập mật khẩu" aria-label="Username"
                aria-describedby="basic-addon1" required v-model="password" />
            </div>
          </div>
          <div class="col-4">
            <small> chọn chức vụ: </small>
            <select class="form-select" aria-label="Default select example" v-model="role">
              <option selected>Quản Lý</option>
              <option>Nhân Viên</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary w-25 py-2">Thêm</button>
    </form>
  </div>
</template>
<style lang="css" scoped>
@import url("~/pages/admin/book/admin.css");
</style>
