export const saveToken = (token, key = "token") => {
    localStorage.setItem(key, token);
  };
  
  export const getToken = (key = "token") => {
    return localStorage.getItem(key);
  };
  
  export const removeToken = (key = "token") => {
    localStorage.removeItem(key);
  };
  