import axios from "axios";

const API_BASE_URL = "http://localhost:8080/v1/api/customer";

export const getCustomerDetails = async (customerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${customerId}`);
    return response.data; // Return the fetched customer data
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
};


export const updateCustomerDetails = async (customerId, updatedData) => {
    try {
      await axios.put(`${API_BASE_URL}/${customerId}`, updatedData);
      return true;
    } catch (error) {
      console.error("Error updating customer details:", error);
      throw error;
    }
  };


 
export const loginCustomer = async (customerEmailId, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { customerEmailId, password });

    if (response.data.status === "SUCCESS") {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Login failed. Please try again." };
  }
};

export const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(API_BASE_URL, customerData);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};


export const getWalletTransactions = async (customerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${customerId}/wallet`);
    return response.data.data; // Returns the `data` array from the API response
  } catch (error) {
    console.error("Error fetching wallet transactions:", error);
    throw error;
  }
};