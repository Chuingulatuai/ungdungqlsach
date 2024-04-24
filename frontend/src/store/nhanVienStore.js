import { defineStore } from 'pinia'
import { nhanVienService } from '../services/nhanVien.service';
import { deleteCookie, setIdFromCookie } from '~/utils/cookieActions';

export const useNhanVienStore = defineStore('nhanVien', {
    state: () => ({
        isLoggedIn: false,
        nhanVien: null,
    }),
    actions: {
        async login(Password, SoDienThoai) {
            try {
                const { data, message } = await nhanVienService.login({ Password, SoDienThoai })

                if (data?._id) {
                    this.nhanVien = data
                    this.isLoggedIn = true
                    setIdFromCookie('admin_id', data?._id)
                    alert(message)
                } else {
                    alert("Đăng nhập thất bại. Vui lòng thử lại sau!")
                }
            } catch (error) {
                alert("Đăng nhập thất bại. Vui lòng thử lại sau!")
            }
        },
        async setInfo(MSNV) {
            try {
                const { data } = await nhanVienService.getOne(MSNV)

                if (data) {
                    this.nhanVien = data
                    this.isLoggedIn = true
                } else {
                    console.error('Failed to get info')
                }
            } catch (error) {
                console.error('Failed to get info: ', error)
            }
        },
        logout() {
            this.isLoggedIn = false
            this.nhanVien = null
            deleteCookie('admin_id')
        },
    }
})