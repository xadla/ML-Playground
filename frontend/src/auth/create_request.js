import { getStoredCsrfToken } from "./csrf";
import authAPI from "./api";

const Request = async (url, ) => {

  try {
    const csrfToken = getStoredCsrfToken();
    const res = await authAPI.get(url, {
      headers: {
        "X-CSRFToken": csrfToken,
      },
      withCredentials: true
    });

    return res;
  } catch (error) {
    if (error.response?.status === 401) {
      return { isAuthenticated: false };
    }
    throw error;
  }

};

export default Request;
