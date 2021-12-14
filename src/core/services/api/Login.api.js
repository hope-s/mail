import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const loginUrl = mainURL + "auth/login/username/user/";

const loginQuery = async (value) => {
  // value is the data coming from form

  return axios.post(loginUrl, value);
};

const LoginUseQuery = () => {
  return useMutation(loginQuery); //// useMutation for post, delete, update requests
};

export default LoginUseQuery;
