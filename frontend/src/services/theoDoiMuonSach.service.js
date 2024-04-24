import axiosCustom from "~/utils/axiosCustom";

const getURL = (url = "") => `/theoDoiMuonSach/${url}`;

export const theoDoiMuonSachService = {
  create: async (data) => await axiosCustom.post(getURL("create"), data),
  update: async (MADOCGIA, MASACH, NGAYMUON, TRANGTHAI) =>
    await axiosCustom.put(
      getURL(
        `update?MADOCGIA=${MADOCGIA}&MASACH=${MASACH}&NGAYMUON=${NGAYMUON}`
      ),
      { TRANGTHAI }
    ),
  getAll: async (status = 0, page = null, MADOCGIA = null) => {
    let url = getURL(`all?status=${status}`);

    if (page) {
      url += `&page=${page}`;
    }

    if (MADOCGIA) {
      url += `&MADOCGIA=${MADOCGIA}`;
    }

    return await axiosCustom.get(url);
  },
  getCount: async () => await axiosCustom.get(getURL("count")),
  getOne: async (MADOCGIA, MASACH, NGAYMUON) =>
    await axiosCustom.get(
      getURL(`info?MADOCGIA=${MADOCGIA}&MASACH=${MASACH}&NGAYMUON=${NGAYMUON}`)
    ),
};
