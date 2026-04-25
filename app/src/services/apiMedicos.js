import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1" //URL que dá acesso ao backend em PHP
});

export const getMedicos = () => api.get("/medicos");
export const createMedico = (data) => api.post("/medicos", data);
export const updateMedico = (data) => api.put("/medicos", data);
export const deleteMedico = (id) => api.delete(`/medicos?id=${id}`);