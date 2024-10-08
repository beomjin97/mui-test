import axios from "axios"
import { CreatePartDto } from "./dto/createPart.dto";
import { ModifyPartDto } from "./dto/modifyPart.dto";
import { ModifyHistroyDto } from "./dto/modifyHistroy.dto";
import { CreateHistroyDto } from "./dto/createHistory.dto";
import { Part } from "./response/part";

const axiosInstance = axios.create({
    baseURL: 'https://58.227.27.19/api',
    timeout: 3000,
    
})

// axiosInstance.interceptors.response.use(
//     (response) => response.data
// )

// PART API CALL
export const getPartList = () => axiosInstance.get<Array<Part>>('/part');
export const getPart = (id: number) => axiosInstance.get(`/part/${id}`)
export const createNewPart = (createPartDto: CreatePartDto) => axiosInstance.post('/part', createPartDto)
export const modifyPart = (id: number, modifyPartDto: ModifyPartDto) => axiosInstance.patch(`/part/${id}`, modifyPartDto)
export const deletePart = (id: number) => axiosInstance.delete(`/part/${id}`)
export const addHistory = (id: number, createHistroyDto: CreateHistroyDto) => axiosInstance.post(`/part/${id}/history`, createHistroyDto)


// HISTORY API CALL
export const modifyHistory = (id: number, modifyHistoryDto: ModifyHistroyDto) => axiosInstance.patch(`/history/${id}`,modifyHistoryDto)
export const deleteHistory = (id: number) => axiosInstance.delete(`/history/${id}`)
