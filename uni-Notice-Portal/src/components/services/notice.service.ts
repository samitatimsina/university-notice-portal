import type { Notice, NoticeStats } from "../../types/notice";
import { api } from "../../api/axios";

export const getNoticeById = async (
  id: string
): Promise<Notice> => {
  const { data } = await api.get(`/admin/notices/${id}`);
  return data.notice;
};

export const getNoticeStats = async (
  id: string
): Promise<NoticeStats> => {
  const { data } = await api.get(
    `/admin/notices/${id}/stats`
  );

  return data.stats;
};

export const deleteNotice = async (
  id: string
) => {
  return api.delete(`/admin/notices/${id}`);
};

// export const resendNotification = async (
//   id: string
// ) => {
//   return api.post(
//     `/admin/notices/${id}/resend`
//   );
// };

export const getStudentNoticeById = async (
  id: string
): Promise<Notice> => {
  const { data } = await api.get(`/student/notices/${id}`);
  return data.notice;
};

export const markNoticeAsRead = async (
  id: string
) => {
  await api.post(`/student/notices/${id}/read`);
};