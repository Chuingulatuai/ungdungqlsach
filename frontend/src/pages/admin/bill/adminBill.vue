<script>
import { theoDoiMuonSachService } from "~/services/theoDoiMuonSach.service";

export default {
  data() {
    return {
      data: [],
      status: 0,
      info: {},
    };
  },
  methods: {
    async getData() {
      try {
        const res = await theoDoiMuonSachService.getAll(this.status);
        if (res.data) {
          this.data = res.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    getClassName(status) {
      if (status === 0) {
        return "chuaduyet";
      } else if (status === 1) {
        return "daduyet";
      } else if (status === 2) {
        return "datra";
      } else {
        return "dahuy";
      }
    },
    convertStatus(status) {
      if (status === 0) {
        return "chờ duyệt";
      } else if (status === 1) {
        return "đã duyệt";
      } else if (status === 2) {
        return "đã trả";
      } else {
        return "đã hủy";
      }
    },
    async checkPhieuMuon(status, data) {
      try {
        const TRANGTHAI = status === 0 ? 1 : status === 1 ? 2 : status;
        const res = await theoDoiMuonSachService.update(
          data.MADOCGIA?._id,
          data.MASACH?._id,
          data.NGAYMUON,
          TRANGTHAI
        );
        alert(res.message);
        await this.getData();
      } catch (e) {
        alert("Thất bại. Vui lòng thử lại sau!");
      }
    },
    async getInfoPM(MADOCGIA, MASACH, NGAYMUON) {
      try {
        const res = await theoDoiMuonSachService.getOne(
          MADOCGIA,
          MASACH,
          NGAYMUON
        );
        if (res.data) {
          this.info = res.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async setId(data) {
      await this.getInfoPM(data.MADOCGIA._id, data.MASACH._id, data.NGAYMUON);
    },
    async handleFilter() {
      await this.getData();
    },
    convertDate(time) {
      if (!time) return "";
      const dateTime = new Date(time);
      if (isNaN(dateTime.getTime())) return "";
      return dateTime.toISOString().split("T")[0];
    },
  },
  mounted() {
    this.getData();
    document.title = "Quản lý phiếu mượn";
  },
};
</script>
<template>
  <div class="container">
    <h2 class="py-2">Quản lý phiếu mượn sách</h2>
    <div class="row">
      <div class="col-4">
        <form action="" @submit.prevent="handleFilter">
          <div class="group-filter">
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="status"
            >
              <option value="0">Phiếu chưa duyệt</option>
              <option value="1">Phiếu đã duyệt</option>
              <option value="-1">Phiếu đã hủy</option>
              <option value="2">Phiếu đã trả</option>
            </select>
            <button type="submit" class="btn btn-primary">
              <i class="fa-solid fa-filter"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="group-title-bill">
        <div class="col-2">Tên độc giả:</div>
        <div class="col-2">Ngày mượn</div>
        <div class="col-2">Ngày trả</div>
        <div class="col-2">Trạng thái</div>
        <div class="col-2"></div>
      </div>
    </div>
    <div class="row" v-if="data" v-for="item in data" :key="item._id">
      <div :class="'group-body-bill ' + getClassName(item.TRANGTHAI)">
        <div class="col-2">{{ item.MADOCGIA?.TEN }}</div>
        <div class="col-2">{{ convertDate(item.NGAYMUON) }}</div>
        <div class="col-2">{{ convertDate(item.NGAYTRA) }}</div>
        <div class="col-2">{{ convertStatus(item.TRANGTHAI) }}</div>
        <div class="col-2">
          <div class="group-btn">
            <button
              class="btn btn-primary edit"
              v-if="item.TRANGTHAI === 0 || item.TRANGTHAI === 1"
              @click="() => checkPhieuMuon(item.TRANGTHAI, item)"
            >
              <i class="fa-regular fa-calendar-check"></i>
            </button>
            <button
              class="btn btn-primary view"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="() => setId(item)"
            >
              <i class="fa-solid fa-eye"></i>
            </button>
            <button
              class="btn btn-primary cancel"
              v-if="item.TRANGTHAI === 0"
              @click="() => checkPhieuMuon(-1, item)"
            >
              <i class="fa-regular fa-calendar-xmark"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
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
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Chi tiết phiếu mượn
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- body -->
          <div class="row" v-if="info">
            <div class="col-6">
              <div class="group-view">
                <p>Tên người dùng:</p>
                <p>{{ info?.MADOCGIA?.TEN }}</p>
              </div>
              <div class="group-view">
                <p>Tên sách:</p>
                <p>{{ info?.MASACH?.TENSACH }}</p>
              </div>

              <div class="group-view">
                <p>Địa chỉ:</p>
                <p>{{ info?.MADOCGIA?.DIACHI }}</p>
              </div>
              <div class="group-view">
                <p>Trạng thái phiếu:</p>
                <p>{{ convertStatus(info?.TRANGTHAI) }}</p>
              </div>

              <div class="group-view">
                <p>Ngày mượn phiếu:</p>
                <p>{{ convertDate(info?.NGAYMUON) }}</p>
              </div>
              <div class="group-view">
                <p>Ngày trả phiếu:</p>
                <p>{{ convertDate(info?.NGAYTRA) }}</p>
              </div>
            </div>
            <div class="col-6">
              <img
                :src="'../../src/assets/images/' + info?.MASACH?.IMAGE"
                class="card-img-top w100"
                alt="..."
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
@import url("~/pages/admin/bill/adminBill.css");
</style>
