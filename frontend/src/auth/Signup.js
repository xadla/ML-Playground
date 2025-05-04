import authAPI from "./api";
import { getStoredCsrfToken } from "./csrf";

const Signup = async (name, email, password, password2) => {
  const csrf = getStoredCsrfToken();

  const res = await authAPI.post(
    "register/",
    {"name": name, "email": email, "password": password, "password2": password2},
    {
      headers: {
        "X-CSRFToken": csrf,
      },
    }
  );

  return res;
}

export default Signup;
