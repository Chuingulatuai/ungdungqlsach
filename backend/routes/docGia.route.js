const router = require("express").Router();
const { docGiaControllers } = require("../controllers/docGia.controller");

router.post("/register", docGiaControllers.register);
router.post("/login", docGiaControllers.login);
router.put("/update", docGiaControllers.update);
router.get("/info", docGiaControllers.getInfo);

module.exports = router;