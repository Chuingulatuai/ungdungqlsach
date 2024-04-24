<script>
import { nhaXuatBanService } from "~/services/nhaXuatBan.service";
import { sachService } from "~/services/sach.service";

export default {
  data() {
    return {
      listNXB: [],
      data: [],
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
  },
  mounted() {
    this.getData();
    this.getListNXB();
    document.title = "Trang chủ";
  },
};
</script>
<template>
  <div class="container body_bao">
    <div
      id="carouselExampleFade"
      class="carousel slide carousel-fade slide-home"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="../assets/images/Default_libary_0.jpg"
            class="d-block w-100"
            alt="..."
            style="max-height: 65vh"
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/images/Default_libary_1.jpg"
            class="d-block w-100"
            alt="..."
            style="max-height: 65vh"
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/images/Default_libary_2.jpg"
            class="d-block w-100"
            alt="..."
            style="max-height: 65vh"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div class="row">
      <div class="col-12">
        <h4 class="title-body">Nhà xuất bản đáng chú ý</h4>
      </div>
      <div class="bao-nxb" v-if="listNXB">
        <div class="bao-producer" v-for="nxb in listNXB" :key="nxb._id">
          <button class="body-producer">{{ nxb.TENNXB }}</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h4 class="title-body">Sản Phẩm</h4>
      </div>
      <div class="col-4" v-if="data" v-for="item in data" :key="item._id">
        <div class="product-card">
          <div class="card card-product" style="width: 18rem">
            <img
              style="max-height: 350px"
              :src="'src/assets/images/' + item.IMAGE"
              class="card-img-top"
            />
            <div class="card-body">
              <h5 class="card-title">{{ item.TENSACH }}</h5>
              <div class="group_ft">
                <div class="row pt-2">
                  <div class="col-6">
                    <p class="card-text m-0">{{ item.MANXB?.TENNXB }}</p>
                  </div>
                  <div class="col-6">
                    <router-link
                      :to="'/detail?id=' + item._id"
                      class="btn btn-primary button-card"
                    >
                      Xem chi tiết
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
@import url("~/pages/home.css");
</style>
