
import { createRouter, createWebHistory } from "vue-router";
import detailHome from "~/layouts/detailHome.vue";
import detailForm from "~/layouts/detailForm.vue";
import detailAdmin from "~/layouts/detailAdmin.vue";
import Home from "~/pages/Home.vue";
import Detail from "~/pages/detail.vue";
import Login from "~/pages/login.vue";
import Register from "~/pages/register.vue";
import Admin from "~/pages/admin/book/admin.vue";
import AdminAddBook from "~/pages/admin/book/adminAddBook.vue";
import AdminProducer from "~/pages/admin/producer/adminProducer.vue";
import AdminProducerAdd from "~/pages/admin/producer/adminAddProducer.vue";
import AdminNV from "~/pages/admin/nv/adminNV.vue";
import AdminBill from "~/pages/admin/bill/adminBill.vue";
import { useDocGiaStore } from "~/store/docGiaStore";
import { useNhanVienStore } from '~/store/nhanVienStore';
import { getIdFromCookie } from "~/utils/cookieActions";

// Định nghĩa các hàm requireAdmin và requireUser ở đây
const requireAdmin = async (to, from, next) => {
  const nhanVienStore = useNhanVienStore()
  if (nhanVienStore.isLoggedIn) {
    next()
  } else {
    const adminId = getIdFromCookie('admin_id')

    if (adminId) {
      const nhanVienStore = useNhanVienStore()
      await nhanVienStore.setInfo(adminId)
      if (nhanVienStore.nhanVien?._id) {
        next({ name: "admin", params: {} })
      } else {
        next({ name: "loginAdmin", params: {} })
      }
    } else {
      next({ name: "loginAdmin", params: {} })
    }
  }
};

const requireUser = async (to, from, next) => {
  const docGiaStore = useDocGiaStore()
  if (docGiaStore.isLoggedIn) {
    next()
  } else {
    const userId = getIdFromCookie('user_id')

    if (userId) {
      const docGiaStore = useDocGiaStore()
      await docGiaStore.setInfo(userId)
      if (docGiaStore.docGia?._id) {
        next({ name: "home", params: {} })
      } else {
        next({ name: "login", params: {} })
      }
    } else {
      next({ name: "login", params: {} })
    }
  }
};

// Khởi tạo router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "",
      component: detailHome,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
        {
          path: "detail",
          name: "detail",
          component: Detail,
        },
      ],
    },
    {
      path: "",
      component: detailForm,
      children: [
        {
          path: "login",
          children: [
            {
              path: 'admin',
              name: 'loginAdmin',
              component: Login,
            },
            {
              path: '',
              name: 'login',
              component: Login,
            },
          ]
        },
        {
          path: "register",
          name: "register",
          component: Register,
        },
      ],
    },
    {
      path: "",
      component: detailAdmin,
      beforeEnter: requireAdmin,
      children: [
        {
          path: "admin",
          name: "admin",
          component: Admin,
        },
        {
          path: "adminaddbook",
          name: "adminaddbook",
          component: AdminAddBook,
        },
        {
          path: "adminproducer",
          name: "adminproducer",
          component: AdminProducer,
        },
        {
          path: "adminproduceradd",
          name: "adminproduceradd",
          component: AdminProducerAdd,
        },
        {
          path: "adminnv",
          name: "adminnv",
          component: AdminNV,
        },
        {
          path: "adminbill",
          name: "adminbill",
          component: AdminBill,
        },
      ],
    },
  ]
});

export default router;
