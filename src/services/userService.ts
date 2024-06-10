import axios from "axios";
import { UserRegister } from "../types";
import { BASE_URL } from "../constants";

const API_ENDPOINT = `${BASE_URL}/api/users`;

async function register(user: UserRegister) {
  const { data } = await axios.post(API_ENDPOINT, user);

  return data;
}

export default {
  register,
};
