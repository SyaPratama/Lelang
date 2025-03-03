import axios from "axios";
import { https } from "./url";

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
    .post(https + "/user/register", userData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        return {
          status: 409,
          message: "Username atau email sudah ada.",
        };
      }
      return error.response;
    });
  return apiRegister;
};

export const getUser = async (token) => {
  try {

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
export const getBarang = async (token) => {
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

export const addBarang = async (barang, token) => {
  try {
    const response = await axios.post(https + "/barang", barang, {
      headers: {
        'Authorization': 'Bearer ' + token,
        "Content-Type":"multipart/form-data"
      }
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const editBarang = async (id_barang, barang, token) => {
  try {
    const response = await axios.put(https + `/barang/${id_barang}`, barang, {
      headers: {
        'Authorization': 'Bearer ' + token,
        "Content-Type":"multipart/form-data"
      }
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteBarang = async (id_barang, token) => {
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
export const getLelang = async (token) => {
  return axios.get(https + '/lelang', {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    console.error("API Error:", error);
    return error.response;
  });
};

// Function to add Lelang data
export const addLelang = async (lelang, token) => {
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
export const deleteLelang = async (id_lelang, token) => {
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
export const updateLelangStatus = async (data, token) => {
  try {
    console.trace(data);
    const response = await axios.put(https + `/lelang/${data.id_lelang}`,{
    id_barang: data.id_barang,
    status: data.status
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

// Function to get Penawaran data
export const getPenawaran = async () => {
  return axios.get(https + '/penawaran')
  .then((response) => {
    return response;
  })
  .catch((error) => {
    console.error("API Error:", error);
    return error.response;
  });
};

// Function to add Penawaran
export const addPenawaran = async (id, token, nominal) => {
  try {
    const response = await axios.post(
      `${https}/${id}/penawaran`,
      { nominal },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

// Function to edit Penawaran
export const editPenawaran = async (id_lelang, id_penawaran, token, nominal) => {
  try {
    const response = await axios.put(https + `/${id_lelang}/penawaran/${id_penawaran}`, 
    { nominal },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

// Function to delete Penawaran
export const deletePenawaran = async (id_penawaran, token) => {
  try {
    const response = await axios.delete(https + `/penawaran/${id_penawaran}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

// Function to get Highest Bid for Penawaran
export const getHighestBid = async (id_penawaran, token) => {
  return axios.get(`${https}/penawaran/${id_penawaran}`, {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    console.error("API Error:", error);
    return error.response;
  });
};

// Function to post history
export const postHistory = async (data, token) => {
  try {
    const response = await axios.post(`${https}/history`, data, {
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

// Function to get history
export const getHistory = async (token) => {
  try {
    const response = await axios.get(`${https}/history`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch history:", error);
    return { status: "error", data: null };
  }
};

// Function to edit history
export const editHistory = async (id_history, data, token) => {
  try {
    const response = await axios.put(`${https}/history/${id_history}`, data, {
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

// Function to delete history
export const deleteHistory = async (id_history, token) => {
  try {
    const response = await axios.delete(https + `/history/${id_history}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};