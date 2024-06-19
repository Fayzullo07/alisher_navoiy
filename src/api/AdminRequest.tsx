import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BACKEND_API;
const API = axios.create({ baseURL: URL });

// const config = {
//   headers: {
//     Authorization: "Bearer " + JSON.parse(localStorage.getItem("user"))?.access,
//   },
// };


// -----------------------------------------DEVONS-----------------------------
// GET
export const devonsGetApi = async () => API.get(`/general`);

// -----------------------------------------DEVONS-----------------------------
// GET
export const biographyGetApi = async () => API.get(`/general/biography`);


// -----------------------------------------GENRES-----------------------------
// GET BY ID
export const genresGetOneAPI = async ({ id = "" }: { id: any }) =>
    API.get(`/genres/${id}/`);

// -----------------------------------------NEWS-----------------------------
// GET
export const newsGetApi = async ({search = ""}) => API.get(`/news/?search=${search}`);

// GET BY ID
export const newsGetOneAPI = async ({ id = "" }: { id: any }) =>
    API.get(`/news/${id}/`);

// -----------------------------------------QUESTIONS-----------------------------
// GET
export const questionsGetApi = async () => API.get(`/questions`);

// GET BY ID
export const questionGetOneAPI = async ({ id = "" }: { id: any }) =>
    API.get(`/questions/${id}/`);

// -----------------------------------------RESEARCH-----------------------------
// GET
export const researchGetApi = async ({ search = "" }) => API.get(`/researches/?search=${search}`);

// -----------------------------------------WORKS-----------------------------
// GET
export const worksGetApi = async ({ search = "" }) => API.get(`/works/?search=${search}`);