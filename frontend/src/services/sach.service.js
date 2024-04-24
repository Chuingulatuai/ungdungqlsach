import axiosCustom from "~/utils/axiosCustom";

const getURL = (url = "") => `/sach/${url}`;

export const sachService = {
  create: async (data) => await axiosCustom.post(getURL("create"), data),
  getAll: async (page = null, limit = null, MaNXB = null, key = null, type = null) => {
    let url = getURL("all");

    if (page) {
      url += `?page=${page}`;
    }

    if (limit) {
      url += `&limit=${limit}`;
    }
    if (MaNXB) {
      url += `&MaNXB=${MaNXB}`;
    }
    if (key && type) {
      url += `&key=${key}&type=${type}`;
    }

    return await axiosCustom.get(url);
  },
  update: async (MASACH, data) =>
    await axiosCustom.put(getURL(`update?id=${MASACH}`), data),
  getOne: async (MASACH) => await axiosCustom.get(getURL(`info?id=${MASACH}`)),
  getCount: async () => await axiosCustom.get(getURL("count")),
  getRandom: async () =>
    await axiosCustom.get(getURL(`random`)),
};
