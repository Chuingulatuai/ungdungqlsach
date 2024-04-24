<script>
import { nhaXuatBanService } from '~/services/nhaXuatBan.service'

export default {
  data() {
    return {
      name: '',
      address: '',
      id: '',
      data: []
    }
  },
  methods: {
    async getData() {
      try {
        const res = await nhaXuatBanService.getAll()
        if (res.data) {
          this.data = res.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getInfo() {
      try {
        const res = await nhaXuatBanService.getOne(this.id)
        if (res.data) {
          this.name = res.data?.TENNXB
          this.address = res.data?.DIACHI
        }
      } catch (e) {
        console.log(e)
      }
    },
    async setId(id) {
      this.id = id
      await this.getInfo()
    },
    async handleUpdateNXB() {
      try {
        const res = await nhaXuatBanService.update(this.id, {
          TENNXB: this.name,
          DIACHI: this.address
        })
        alert(res.message)
        await this.getData()
      } catch (e) {
        alert('Cập nhật thất bại!')
      }
    }
  },
  mounted() {
    this.getData()
    document.title = 'Quản lý nhà xuât bản'
  }
}

</script>
<template>
  <div class="container">
    <h2 class="py-2">Quản nhà xuất bản</h2>
    <table class="table my-5 table-admin">
      <thead>
        <tr>
          <th scope="col">Tên nhà xuất bản</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">Số sách</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-if="data">
        <tr v-for="item in data" :key="item._id">
          <td>{{ item.TENNXB }}</td>
          <td>{{ item.DIACHI }}</td>
          <td>{{ item.count }}</td>
          <td>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
              @click="() => setId(item._id)">
              <i class="fa-solid fa-pen"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            sửa nhà xuất bản
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="" class="form-add-book">
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
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            hủy
          </button>
          <button type="submit" class="btn btn-primary" @click="handleUpdateNXB">sửa</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
@import url("~/pages/admin/producer/admin.css");
</style>
