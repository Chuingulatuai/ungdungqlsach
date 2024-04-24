import axiosCustom from "~/utils/axiosCustom";

const getURL = (url = "") => `/nhaXuatBan/${url}`;

export const nhaXuatBanService = {
  create: async (data) => await axiosCustom.post(getURL("create"), data),
  getAll: async () => await axiosCustom.get(getURL("all")),
  update: async (MANXB, data) =>
    await axiosCustom.put(getURL(`update?id=${MANXB}`), data),
  getOne: async (MANXB) => await axiosCustom.get(getURL(`info?id=${MANXB}`)),
};
