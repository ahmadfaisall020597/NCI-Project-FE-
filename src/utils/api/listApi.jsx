import request from "../../helpers/api";

const signIn = (payload) => {
  // console.log('payload : ', payload);
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

const createVideo = (payload) => {
  console.log('payload video : ', payload);
  return request({
    url: "/api/videos",
    method: 'POST',
    data: payload,
  });
}

const listVideo = (page = 1, limit = 10, searchQuery = '') => {
  return request({
    url: `/api/videos?page=${page}&limit=${limit}&search=${searchQuery}`,
    method: 'GET'
  });
}

const detailVideo = (id) => {
  return request({
    url: `/api/videos/${id}`,
    method: 'GET'
  });
}

const deleteVideo = (id, payload) => {
  return request({
    url: `/api/videos/${id}`,
    method: 'DELETE',
    data: payload,
  })
}

const editVideo = (id, payload) => {
  return request({
    url: `/api/videos/${id}`,
    method: 'PUT',
    data: payload,
  });
}

const listVideoDashboard = () => {
  return request({
    url: "/api/index-dashboard",
    method: 'GET',
  })
}


const CommonService = {
  signIn,
  signOut,
  createVideo,
  listVideo,
  detailVideo,
  deleteVideo,
  editVideo,
  listVideoDashboard,
}

export default CommonService;