import request from "../../helpers/api";

const signIn = (payload) => {
  console.log('payload : ', payload);
  return request({
    url: "/api/login",
    method: "POST",
    data: payload,
  });
};

const signOut = () => {
  return request({
    url: "api/logout",
    method: 'POST'
  });
}

const CommonService = {
  signIn,
  signOut,
}

export default CommonService;