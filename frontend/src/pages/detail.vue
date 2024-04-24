<script>
import { useDocGiaStore } from "~/store/docGiaStore";
import { sachService } from "~/services/sach.service";
import { defineComponent } from "vue";
import { theoDoiMuonSachService } from "~/services/theoDoiMuonSach.service";
import { getIdFromCookie } from "~/utils/cookieActions";

export default defineComponent({
  data() {
    return {
      data: {},
      id: "",
      start: "",
      end: "",
    };
  },
  methods: {
    async getInfo() {
      try {
        const res = await sachService.getOne(this.id);
        if (res.data) {
          this.data = res.data;
          document.title = res.data?.TENSACH;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async handleCreatePM() {
      try {
        const docGiaStore = useDocGiaStore();
        let maDG;
        if (docGiaStore.docGia?._id) {
          maDG = docGiaStore.docGia?._id;
        } else {
          maDG = getIdFromCookie("user_id");
        }
        if (maDG) {
          const res = await theoDoiMuonSachService.create({
            MADOCGIA: maDG,
            MASACH: this.id,
            NGAYMUON: new Date(this.start),
            NGAYTRA: new Date(this.end),
          });
          alert(res.message);
          await this.getInfo();
        } else {
          this.$router.push({ name: "login" });
        }
      } catch (e) {
        alert("Tạo phiếu mượn thất bại!");
      }
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getInfo();
  },
});
</script>
<template>
  <div class="container body_bao" v-if="data">
    <div class="row my-2">
      <div class="col-12">
        <h2 class="title-body">{{ data.TENSACH }}</h2>
      </div>
      <h3>Chi tiết sách:</h3>
    </div>
    <div class="row">
      <div class="col-3">
        <img
          style="width: 60%"
          :src="'src/assets/images/' + data.IMAGE"
          alt=""
        />
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6 group-field">
            <p class="field-book">Giá:</p>
            <p class="value-field">
              {{ data.DONGIA?.toLocaleString("vi-VN") }}₫
            </p>
          </div>
          <div class="col-6">
            <div class="col-6 group-field">
              <p class="field-book">Số quyển:</p>
              <p class="value-field">{{ data.SOQUYEN }}</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-5 group-field">
            <p class="field-book">Năm xuất bản:</p>
            <p class="value-field">{{ data.NAMXUATBAN }}</p>
          </div>
          <div class="col-7">
            <div class="col-6 group-field">
              <p class="field-book">Nhà xuất bản:</p>
              <p class="value-field">{{ data.MANXB?.TENNXB }}</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 group-field">
            <p class="field-book">Tác giả:</p>
            <p class="value-field">{{ data.TACGIA }}</p>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="row">
          <h5 class="text-center">
            chọn ngày mượn và ngày trả để đăng ký mượn!
          </h5>
          <form
            action=""
            class="form-detail p-3"
            @submit.prevent="handleCreatePM"
          >
            <div class="col-12 my-2 mx-4">
              <p class="field-book">Ngày mượn:</p>
              <input type="date" v-model="start" />
            </div>
            <div class="col-12 my-2 mx-4">
              <p class="field-book">Ngày trả:</p>
              <input type="date" v-model="end" />
            </div>
            <button type="submit" class="btn btn-primary mx-4">đăng ký</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
@import url("~/pages/home.css");

.group-field {
  display: flex;
  gap: 10px;
}

.field-book {
  font-size: 16;
  font-weight: 700;
}

.value-field {
  font-weight: 500;
  font-size: 15px;
}

.form-detail {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
