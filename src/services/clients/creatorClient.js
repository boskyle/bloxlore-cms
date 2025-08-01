import axios from "axios";

const creatorClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default creatorClient;