import authAPI from "./api";

const CheckEmail = async (email) => {
  try {
    const res = await authAPI.get(`check/email/?email=${email}`);
    return res.data.available;
  } catch(error) {
    console.error(error);
    throw error;
  }
};

export default CheckEmail;
