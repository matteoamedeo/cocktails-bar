import axios from "axios";
import { checkTokenFromStorage } from "./helpers/LocalStorage";

const instance = () =>
  axios.create({
    baseUrl: process.env.BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${checkTokenFromStorage()}`,
    },
  });

export default instance;
