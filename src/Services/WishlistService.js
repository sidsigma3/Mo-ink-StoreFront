import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL

const BASE_URL =  URL + "/wishlist"; 

export const addToWishlist = async (customerId, segmentId) => {
  try {
    const response = await axios.post(`${BASE_URL}/${customerId}/add/${segmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};


export const removeFromWishlist = async (customerId, variantId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${customerId}/delete/${variantId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};


export const getWishlist = async (customerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${customerId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};
