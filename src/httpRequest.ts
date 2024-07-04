import axios from "axios"
import { CreatePartDto } from "./dto/createPart.dto";
import { ModifyPartDto } from "./dto/modifyPart.dto";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 3000,
    
})

axiosInstance.interceptors.response.use(
    (response) => response.data
)

// PART API CALL
export const getPartList = axiosInstance.get('/part');

export const getPart = (id: number) => axiosInstance.get(`/part/${id}`)

export const createNewPart = (createPartDto: CreatePartDto) => axiosInstance.post('/part', createPartDto)

export const modifyPart = (id: number, modifyPartDto: ModifyPartDto) => axiosInstance.patch(`/part/${id}`, modifyPartDto)

export const deletePart = (id: number) => axiosInstance.delete(`/part/${id}`) 


// HISTORY API CALL
export const modifyHistory = (id: number,) => 

