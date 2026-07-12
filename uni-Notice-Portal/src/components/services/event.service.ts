import { api } from "../../api/axios";

export const createEvent = async(data:any)=>{

    const res = await api.post(
        "/admin/event/create",
        data
    );

    return res.data;

}

export const getEvents = async()=>{

    const res = await api.get("/admin/event");

    return res.data;

}
export const getStudentEvents = async()=>{

    const res = await api.get("/student/event");

    return res.data;

}