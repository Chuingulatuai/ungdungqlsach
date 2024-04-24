<script>
import { nhaXuatBanService } from "~/services/nhaXuatBan.service";
import { sachService } from "~/services/sach.service";

export default {
  data() {
    return {
      data: [],
      id: "",
      name: "",
      price: "",
      total: "",
      year: "",
      nxb: "",
      image: "",
      author: "",
      listNXB: [],
    };
  },
  methods: {
    async getData() {
      try {
        const res = await sachService.getAll();
        if (res.data) {
          this.data = res.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getListNXB() {
      try {
        const res = await nhaXuatBanService.getAll();
        if (res.data) {
          this.listNXB = res.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async setId(id) {
      this.id = id;
      await this.getListNXB();
      await this.getInfo();
    },
    async getInfo() {
      try {
        const res = await sachService.getOne(this.id);
        if (res.data) {
          const data = res.data;
          this.name = data.TENSACH;
          this.price = data.DONGIA;
          this.total = data.SOQUYEN;
          this.year = data.NAMXUATBAN;
          this.nxb = data.MANXB?._id;
          this.image = data.IMAGE;
          this.author = data.TACGIA;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async handleUpdateData() {
      try {
        const res = await sachService.update(this.id, {
          TENSACH: this.name,
          DONGIA: +this.price,
          SOQUYEN: +this.total,
          NAMXUATBAN: +this.year,
          MANXB: this.nxb,
          TACGIA: this.author,
          IMAGE: this.image,
        });
        alert(res.message);
        await this.getData();
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.getData();
    document.title = "Quản lý sách";
  },
};
</script>
<template>
  <div class="container">
    <h2 class="py-2">Quản lý sách</h2>
    <table class="table my-5 table-admin">
      <thead>
        <tr>
          <th scope="col">Tên sách</th>
          <th scope="col">Số lượng sách</th>
          <th scope="col">Hình ảnh</th>
          <th scope="col">Nhà xuất bản</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-if="data">
        <tr v-for="item in data" :key="item._id">
          <th>{{ item.TENSACH }}</th>
          <td>{{ item.SOQUYEN }}</td>
          <td>
            <img
              style="width: 50px"
              :src="`/src/assets/images/${item.IMAGE}`"
              alt=""
            />
          </td>

          <td>{{ item.MANXB?.TENNXB }}</td>
          <td>
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="() => setId(item._id)"
            >
              <i class="fa-solid fa-pen"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">sửa sách</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form action="" class="form-add-book">
            <small> tên sách: </small>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Nhập tên sách"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                v-model="name"
              />
            </div>

            <small> giá sách: </small>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Nhập giá sách"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                v-model="price"
              />
            </div>
            <small> số quyển sách: </small>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Nhập số quyển sách"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                v-model="total"
              />
            </div>
            <small> hình ảnh: </small>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Nhập hình ảnh"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                v-model="image"
              />
            </div>
            <small> tên tác giả: </small>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Nhập tên tác giả"
                aria-label="Username"
                aria-describedby="basic-addon1"
                required
                v-model="author"
              />
            </div>
            <div class="group-input-row mb-3">
              <div class="row">
                <div class="col-8">
                  <small> năm xuất bản sách: </small>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nhập năm xuất bản sách"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      required
                      v-model="year"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <small> chọn nxb: </small>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="nxb"
                    v-if="listNXB"
                  >
                    <option
                      v-for="item in listNXB"
                      :key="item._id"
                      :value="item._id"
                      :selected="item._id === nxb"
                    >
                      {{ item.TENNXB }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            hủy
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            @click="handleUpdateData"
          >
            sửa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
@import url("~/pages/admin/book/admin.css");
</style>
