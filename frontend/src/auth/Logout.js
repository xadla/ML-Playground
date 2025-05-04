import Request from "./create_request";

const Logout = async () => {
  return Request("logout/");
};

export default Logout;
