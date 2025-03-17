import axios from "axios";

// const API_URL = "http://localhost:8080/v1/api/product";
const API_URL = 'http://82.25.105.65:8080/v1/api/product';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.data.status === "SUCCESS") {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to fetch products." };
  }
};
