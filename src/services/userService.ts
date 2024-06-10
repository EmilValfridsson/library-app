import axios from "axios";
import { UserRegister } from "../types";

const API_BASEURL = "http://localhost:5588/api/users";

async function register(user: UserRegister) {
  const { data } = await axios.post(API_BASEURL, user);

  return data;
}

export default {
  register,
};
