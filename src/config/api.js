import axios from "axios";
import { https } from "./url";
import { getToken } from "../helpers/LocalStorage";

//Auth
export const handleLogin = async (username, password) => {
  const apiLogin = await axios
    .post(https + "/auth/user", {
      username: username,
      password: password,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return apiLogin;
};

export const handleLoginAdmin = async (username, password) => {
  const apiLogin = await axios
    .post(https + "/auth/admin", {
      username: username,
      password: password,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return apiLogin;
};

export const handleRegister = async (userData) => {
  const apiRegister = await axios
    .post(https + "/user/register", userData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return apiRegister;
};

//Admin
export const getBarang = async () => {
  const token = getToken();

  return axios.get(https + '/barang', {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error.response.data;
  });
};

export const addBarang = async (barang) => {
  const token = getToken();

  try {
    const response = await axios.post(https + "/barang", barang, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const editBarang = async (id_barang, barang) => {
  const token = getToken();

  try {
    const response = await axios.put(https + `/barang/${id_barang}`, barang, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteBarang = async (id_barang) => {
  const token = getToken();

  try {
    const response = await axios.delete(https + `/barang/${id_barang}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};
