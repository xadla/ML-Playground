import authAPI from "./api";
import { getStoredCsrfToken } from "./csrf";


const Login = async (username, password) => {
  const csrfToken = getStoredCsrfToken();

  const res = await authAPI.post(
    "login/",
    { username, password },
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
    }
  );

  return res;
};


export default Login;
