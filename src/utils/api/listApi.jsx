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

const listPengumuman = (page = 1, limit = 10, searchQuery = '') => {
  return request({
    url: `/api/announcement?page=${page}&limit=${limit}&search=${searchQuery}`,
    method: 'GET'
  });
}

const createPengumuman = (payload) => {
  return request({
    url: "/api/announcement",
    method: 'POST',
    data: payload,
  });
}

const editPengumuman = (id, payload) => {
  return request({
    url: `/api/announcement/${id}`,
    method: 'PUT',
    data: payload,
  });
}

const deletePengumuman = (id, payload) => {
  return request({
    url: `/api/announcement/${id}`,
    method: 'DELETE',
    data: payload,
  })
}

const createBerita = (payload) => {
  return request({
    url: "/api/news",
    method: 'POST',
    data: payload,
  });
}

const listBerita = (page = 1, limit = 10, searchQuery = '') => {
  return request({
    url: `/api/news?page=${page}&limit=${limit}&search=${searchQuery}`,
    method: 'GET'
  });
}

const detailBerita = (id) => {
  return request({
    url: `/api/berita/${id}`,
    method: 'GET'
  });
}

const deleteBerita = (id, payload) => {
  return request({
    url: `/api/news/${id}`,
    method: 'DELETE',
    data: payload,
  })
}

const editBerita = (id, payload) => {
  return request({
    url: `/api/news-update/${id}`,
    method: 'POST',
    data: payload,
  });
}

const listBeritaDashboard = () => {
  return request({
    url: "/api/views-dashboard",
    method: 'GET',
  })
}

const createPelatihan =  (payload) => {
  return request({
    url: "/api/pelatihan",
    method: 'POST',
    data: payload,
  });
}

const listPelatihan = (page = 1, limit = 10, searchQuery = '') => {
  return request({
    url: `/api/pelatihan?page=${page}&limit=${limit}&search=${searchQuery}`,
    method: 'GET'
  });
}

const deletePelatihan = (id, payload) => {
  return request({
    url: `/api/pelatihan/${id}`,
    method: 'DELETE',
    data: payload,
  })
}

const editPelatihan = (id, payload) => {
  return request({
    url: `/api/pelatihan-update/${id}`,
    method: 'POST',
    data: payload,
  });
}

const listPelatihanDashboard = () => {
  return request({
    url: "/api/views-dashboard-pelatihan",
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
  listPengumuman,
  createPengumuman,
  editPengumuman,
  deletePengumuman,
  createBerita,
  listBerita,
  detailBerita,
  deleteBerita,
  editBerita,
  listBeritaDashboard,
  createPelatihan,
  listPelatihan,
  deletePelatihan,
  editPelatihan,
  listPelatihanDashboard
}

export default CommonService;