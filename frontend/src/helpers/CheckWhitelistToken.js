import instance from "../api";
const axiosInstance = instance();

async function checkToken() {
  try {
    const response = await axiosInstance.get("/account/checkToken");
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.log("CHECK TOKEN ", error);
    return false;
  }
}

export default checkToken;
