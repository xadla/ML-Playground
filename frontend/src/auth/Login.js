import authAPI from "./api";
import { getStoredCsrfToken } from "./csrf";


const Login = async (email, password) => {
  const csrfToken = getStoredCsrfToken();

  const res = await authAPI.post(
    "login/",
    { email, password },
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
    }
  );

  return res;
};


export default Login;
