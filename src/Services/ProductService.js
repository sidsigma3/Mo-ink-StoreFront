import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL

const API_URL =  URL + "/product";

export const fetchProductsById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`);
    if (response.data.status === "SUCCESS") {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to fetch products." };
  }
};


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
