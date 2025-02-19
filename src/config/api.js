import axios from "axios";
import { https } from "./url";
import { getToken } from "../helpers/LocalStorage";

// Auth
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
    .post("https://apilelang.umixstudio.web.id/user", userData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return apiRegister;
};

export const getUser = async () => {
  try {
    const token = getToken();
    console.log("Token yang digunakan:", token); // Debugging

    const response = await axios.get(https + '/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response;
  } catch (error) {
    console.error("Error saat mengambil data user:", error.response || error);
    return error.response ? error.response.data : { error: "Terjadi kesalahan" };
  }
};

// Admin
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

// New function to get Lelang data
export const getLelang = async () => {
  const token = getToken();

  return axios.get(https + '/lelang', {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  })
  .then((response) => {
    console.log("API Response:", response);
    return response;
  })
  .catch((error) => {
    console.error("API Error:", error);
    return error.response;
  });
};

// Function to add Lelang data
export const addLelang = async (lelang) => {
  const token = getToken();

  try {
    const response = await axios.post(https + "/lelang", lelang, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

// Function to delete Lelang data
export const deleteLelang = async (id_lelang) => {
  const token = getToken();

  try {
    const response = await axios.delete(https + `/lelang/${id_lelang}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

// Function to update Lelang status
export const updateLelangStatus = async (id_lelang, tgl_lelang, status) => {
  const token = getToken();

  try {
    const response = await axios.put(https + `/lelang/${id_lelang}`,{
    id_barang: 1,
    tgl_lelang: tgl_lelang,
    status: status
    }, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

