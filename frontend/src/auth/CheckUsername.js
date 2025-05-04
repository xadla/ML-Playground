import authAPI from "./api";

const CheckUsername = async (username) => {
  try {
    const res = await authAPI.get(`check/username/?username=${username}`);
    return res.data.available;
  } catch(error) {
    console.error(error);
    throw error;
  }
};

export default CheckUsername;
