import { defineStore } from 'pinia'
import { docGiaService } from '~/services/docGia.service';
import { setIdFromCookie } from '~/utils/cookieActions';

export const useDocGiaStore = defineStore('docGia', {
    state: () => ({
        isLoggedIn: false,
        docGia: null,
    }),
    actions: {
        async login(MATKHAU, DIENTHOAI) {
            try {
                const { data, message } = await docGiaService.login({ MATKHAU, DIENTHOAI })

                if (data?._id) {
                    this.docGia = data
                    this.isLoggedIn = true
                    setIdFromCookie('user_id', data?._id)
                    alert(message)
                } else {
                    alert("Đăng nhập thất bại. Vui lòng thử lại sau!")
                }
            } catch (error) {
                alert("Đăng nhập thất bại. Vui lòng thử lại sau!")
            }
        },
        async setInfo(MADOCGIA) {
            try {
                const { data } = await docGiaService.getInfo(MADOCGIA)

                if (data) {
                    this.docGia = data
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
            this.docGia = null
            deleteCookie('user_id')
        },
    }
})