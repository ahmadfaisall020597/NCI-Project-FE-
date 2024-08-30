import axios from "axios";
import { getAuthorization } from "./storage";

const token = getAuthorization();
console.log("token : ", token);

const request = async (options) => {
  const client = axios.create({
    baseURL: "http://localhost/Project%20Freelance/Project%20News/backend/public",
  });
  console.log("option request : ", options);
  options.headers = {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    crossorigin: true,
    ...(token && { authorization: `Bearer ${token.token}` }),
  };
  const onSuccess = async (response) => {
    console.log('response token : ', response);
    return response.data;
  };

  const onError = (error) => {
    console.error('Request error:', error);
    throw error;
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
