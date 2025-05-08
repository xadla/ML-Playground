import Request from "/src/auth/create_request.js";

const CheckAuth = async () => {
  try {
    const result = await Request("check/");
    if (result?.data?.isAuthenticated === "true") {
      return result.data.user;
    }
  } catch (error) {
    console.error("Error checking user:", error);
  }

  return null;
};

export default CheckAuth;
