<script></script>
<template>
  <header class="header">
    <div class="container py-3">
      <div class="row">
        <div class="col-5">
          <div class="logo">
            <router-link to="/" class="link-home">
              <h2>NguyenLibary</h2>
            </router-link>
          </div>
        </div>
        <div class="col-7">
          <div class="header-right">
            <form class="form-search">
              <input class="form-control" type="search" placeholder="Tìm Kiếm" aria-label="Search" />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                <i class="fa fa-search"></i>
              </button>
            </form>
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight">
              <i class="fa-solid fa-bars"></i>
            </button>

            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">
                  Mục lục
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <div class="groupcanvas">
                  <router-link to="/login" class="btn btn-primary link-form">Đăng nhập</router-link>
                  <router-link to="/register" class="btn btn-primary link-form">Đăng ký</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <main><router-view /></main>
  <footer class="footer py-4">
    <div class="contaner text-center">
      <h4 class="title-footer">&copy; website design by huynh trong nguyen</h4>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import url("~/assets/css/detailHome.css");

.link-home {
  text-decoration: none;
}

.groupcanvas {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
}

.link-form {
  width: 50%;
}
</style>
