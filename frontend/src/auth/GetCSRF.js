import { getCsrfToken } from "../auth/api";
import { setCsrfToken } from "../auth/csrf";


const GetCSRF = () => {
  const fetchCsrf = async () => {
    const token = await getCsrfToken();
    setCsrfToken(token);
  };
  fetchCsrf();
}

export default GetCSRF;
