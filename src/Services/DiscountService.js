import axios from "axios";

const BASE_URL = "http://localhost:8080/v1/api/discount"; 

export const getAllDiscounts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; 
  } catch (error) {
    console.error("Error fetching discounts:", error);
    throw error;
  }
};
