import axios from "axios";
import { useMutation } from "react-query";

const mainURL = process.env.REACT_APP_BASE_URL;
const loginUrl = mainURL + "chat/";

const createChatQuery = async (value) => {
  // value is the data coming from form

  return axios.post(loginUrl, value);
};

const CreateChatUseQuery = () => {
  return useMutation(createChatQuery); //// useMutation for post, delete, update requests
};

export default CreateChatUseQuery;
