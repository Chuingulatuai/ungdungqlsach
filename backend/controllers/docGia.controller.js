const docGiaModel = require("../models/docGia.model");
const bcrypt = require("bcrypt")

const docGiaControllers = {
    register: async (req, res) => {
        const { HOLOT, TEN, DIACHI, MATKHAU, DIENTHOAI } = req.body;

        if (!HOLOT || !TEN || !DIACHI || !MATKHAU || !DIENTHOAI) {
            return res.status(400).json({
                message: "Tất cả các trường là bắt buộc!"
            });
        }

        try {
            const hashedPassword = await bcrypt.hash(MATKHAU, 10);

            const docGia = await docGiaModel.create({
                HOLOT,
                TEN,
                MATKHAU: hashedPassword,
                DIACHI,
                DIENTHOAI,
            });

            if (docGia) {
                return res.status(200).json({
                    message: "Đăng ký thành công!"
                })
            } else {
                return res.status(404).json({
                    message: "Đăng ký thất bại!"
                });
            }
        } catch (e) {
            return res.status(500).json({
                message: "Lỗi server!",
                error: err.message
            })
        }
    },
    login: async (req, res) => {
        const { MATKHAU, DIENTHOAI } = req.body

        if (!MATKHAU || !DIENTHOAI) {
            return res.status(400).json({
                message: "Tất cả các trường là bắt buộc!"
            });
        }

        try {
            const docGia = await docGiaModel.findOne({ DIENTHOAI })

            if (docGia && (await bcrypt.compare(MATKHAU, docGia.MATKHAU))) {
                return res.status(200).json({
                    data: {
                        _id: docGia._id
                    },
                    message: "Đăng nhập thành công!"
                })
            } else {
                return res.status(404).json({
                    message: "Số điện thoại hoặc mật khẩu không khớp!"
                })
            }
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi server!",
                error: err.message
            })
        }
    },
    update: async (req, res) => {
        const { id } = req.query
        const { HOLOT, TEN, DIACHI, NGAYSINH, PHAI } = req.body;

        const checkPHAI = (data) => !isNaN(parseInt(data)) && [0, 1, 2].indexOf(data) !== -1

        if (!HOLOT || !TEN || !DIACHI || !NGAYSINH || !id || !checkPHAI(PHAI)) {
            return res.status(400).json({
                message: "Tất cả các trường là bắt buộc!"
            })
        }

        try {
            const docGia = await docGiaModel.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        HOLOT,
                        TEN,
                        DIACHI,
                        NGAYSINH,
                        PHAI
                    },
                    $unset: {
                        MATKHAU: 1
                    }
                },
                { new: true }
            )

            if (docGia) {
                return res.status(200).json({
                    data: docGia,
                    message: "Cập nhật thông tin độc giả thành công!"
                })
            } else {
                return res.status(404).json({
                    message: "Cập nhật thất bại!"
                })
            }
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi server!",
                error: err.message
            })
        }
    },
    getInfo: async (req, res) => {
        const { id } = req.query

        if (!id) {
            return res.status(400).json({
                message: "Không tồn tại mã độc giả!"
            })
        }

        try {
            const docGia = await docGiaModel.findOne({ _id: id }, { MATKHAU: 0 })

            if (docGia) {
                return res.status(200).json({
                    data: docGia,
                    message: "Lấy thông tin độc giả thành công!"
                })
            } else {
                return res.status(404).json({
                    message: "Lấy thông tin độc giả thất bại!"
                })
            }
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi server!",
                error: err.message
            })
        }
    }
}

module.exports = { docGiaControllers };