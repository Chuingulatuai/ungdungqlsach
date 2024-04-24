import axiosCustom from "~/utils/axiosCustom";

const getURL = (url = "") => `/nhanVien/${url}`;

export const nhanVienService = {
  login: async (data) => await axiosCustom.post(getURL("login"), data),
  create: async (data) => await axiosCustom.post(getURL("create"), data),
  getOne: async (MSNV) => await axiosCustom.get(getURL(`info?id=${MSNV}`)),
};
