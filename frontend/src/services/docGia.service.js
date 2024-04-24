import axiosCustom from "~/utils/axiosCustom";

const getURL = (url = "") => `/docGia/${url}`;

export const docGiaService = {
  register: async (data) => await axiosCustom.post(getURL("register"), data),
  login: async (data) => await axiosCustom.post(getURL("login"), data),
  getInfo: async (MaDocGia) =>
    await axiosCustom.get(getURL(`info?id=${MaDocGia}`)),
  update: async (MaDocGia, data) =>
    await axiosCustom.put(getURL(`update?id=${MaDocGia}`), data),
};
