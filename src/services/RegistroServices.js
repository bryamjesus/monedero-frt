import axios from "axios";
const URL_API = `http://localhost:3000/registro`


export const listarRegistro = async () => {
  const result = await axios.get(URL_API);
  return result.data
}

export const mostrarRegistro = async (id) => {
  const result = await axios.get(`${URL_API}/${id}`);
  return result
}

export const guardarRegistro = async (datos) => {
  const result = await axios.post(URL_API, datos);
  return result
}

export const editarRegistro = async (datos) => {
  const result = await axios.put(`${URL_API}/${datos._id}`, datos);
  return result
}

export const eliminarRegistro = async (id) => {
  const result = await axios.delete(`${URL_API}/${id}`);
  return result
}

