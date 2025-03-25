import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL
const BASE_URL = URL + "/discount"; 


export const getAllDiscounts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; 
  } catch (error) {
    console.error("Error fetching discounts:", error);
    throw error;
  }
};
