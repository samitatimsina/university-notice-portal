import { api } from "../../api/axios";

export const getAdminProfile = async () => {
    const { data } = await api.get("/admin/profile");
    return data.user;
};
export const getStudentProfile = async () => {
    const { data } = await api.get("/student/profile");
    return data.user;
};