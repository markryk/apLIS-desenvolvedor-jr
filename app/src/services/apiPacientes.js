import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1", //URL que dá acesso ao backend em JS
    headers: { "Content-Type": "application/json" }
});

export const getPacientes = () => api.get("/pacientes");
export const createPaciente = (data) => api.post("/pacientes", data);
export const updatePaciente = (id, data) => api.put(`/pacientes/${id}`, data);
export const deletePaciente = (id) => api.delete(`/pacientes/${id}`);