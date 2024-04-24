const router = require("express").Router();
const { nhanVienControllers } = require("../controllers/nhanVien.controller");

router.post("/create", nhanVienControllers.create);
router.post("/login", nhanVienControllers.login);
router.get("/info", nhanVienControllers.getInfo);

module.exports = router;