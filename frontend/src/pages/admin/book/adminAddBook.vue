<script>
import { nhaXuatBanService } from '~/services/nhaXuatBan.service'
import { sachService } from '~/services/sach.service'

export default {
  data() {
    return {
      name: '',
      price: '',
      total: '',
      year: '',
      nxb: '',
      image: '',
      author: '',
      listNXB: []
    }
  },
  methods: {
    async getData() {
      try {
        const res = await nhaXuatBanService.getAll()
        if (res.data) {
          this.listNXB = res.data
          this.nxb = res.data[0]._id
        }
      } catch (e) {
        console.log(e)
      }
    },
    clearData() {
      this.name = ''
      this.price = ''
      this.total = ''
      this.year = ''
      this.nxb = this.listNXB[0] ? this.listNXB[0]._id : ''
      this.image = ''
      this.author = ''
    },
    async handleCreteBook() {
      try {
        const res = await sachService.create({
          TENSACH: this.name,
          DONGIA: +this.price,
          SOQUYEN: +this.total,
          NAMXUATBAN: +this.year,
          MANXB: this.nxb,
          TACGIA: this.author,
          IMAGE: this.image
        })
        alert(res.message)
        this.clearData()
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.getData()
    document.title = 'Thêm mới sách'
  }
}

</script>
<template>
  <div class="container">
    <h2 class="py-2">Thêm sách</h2>
    <form action="" class="form-add-book" @submit.prevent="handleCreteBook">
      <small> tên sách: </small>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Nhập tên sách" aria-label="Username"
          aria-describedby="basic-addon1" required v-model="name" />
      </div>

      <small> giá sách: </small>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Nhập giá sách" aria-label="Username"
          aria-describedby="basic-addon1" required v-model="price" />
      </div>
      <small> số quyển sách: </small>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Nhập số quyển sách" aria-label="Username"
          aria-describedby="basic-addon1" required v-model="total" />
      </div>
      <small> hình ảnh: </small>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Nhập hình ảnh" aria-label="Username"
          aria-describedby="basic-addon1" required v-model="image" />
      </div>
      <small> tên tác giả: </small>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Nhập tên tác giả" aria-label="Username"
          aria-describedby="basic-addon1" required v-model="author" />
      </div>
      <div class="group-input-row mb-3">
        <div class="row">
          <div class="col-8">
            <small> năm xuất bản sách: </small>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Nhập năm xuất bản sách" aria-label="Username"
                aria-describedby="basic-addon1" required v-model="year" />
            </div>
          </div>
          <div class="col-4">
            <small> chọn nhà xuất bản: </small>
            <select class="form-select" aria-label="Default select example" v-model="nxb" v-if="listNXB">
              <option v-for="item in listNXB" :key="item._id" :value="item._id">
                {{ item.TENNXB }}
              </option>
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
