import { api } from "../../api/axios";

export const createHoliday = async(data:any)=>{

    const res = await api.post(
        "/admin/holiday/create",
        data
    );

    return res.data;

}

export const getHoliday = async()=>{

    const res = await api.get("/admin/holiday");

    return res.data;

}
export const getStudentHoliday = async()=>{

    const res = await api.get("/student/holiday");

    return res.data;

}