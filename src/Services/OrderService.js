import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL;
const API_BASE_URL = `${URL}/orders`;

// export const getCustomerOrderDetails = async (customerId) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/customer/${customerId}`);
//     return response.data; // Return the fetched order data
//   } catch (error) {
//     console.error("Error fetching order details:", error);
//     throw error;
//   }
// };


export const getPaginatedCustomerOrders = async (customerId, page = 1, size = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customer/${customerId}/paginated?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated orders:", error);
    throw error;
  }
};


// Get order details by order ID
export const getOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${orderId}`);
    return response.data; // Return the fetched order data
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(API_BASE_URL, orderData);
    return response.data; // Return the created order data
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Update an existing order
export const updateOrderDetails = async (orderId, updatedData) => {
  try {
    await axios.put(`${API_BASE_URL}/${orderId}`, updatedData);
    return true;
  } catch (error) {
    console.error("Error updating order details:", error);
    throw error;
  }
};

// Delete an order by ID
export const deleteOrder = async (orderId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${orderId}`);
    return true;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};


export const updateOrderVariantStatuses = async (orderId,updates) => {
  try {
    const response = await axios.put(`${URL}/order-variants/status-update/${orderId}`, updates);
    return response.data;
  } catch (error) {
    console.error(`Error updating status of order with ID ${orderId}:`, error);
    throw error;
  }
};


export const updateOrderStatuses = async (orderId,updates) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${orderId}/status-update`, updates);
    return response.data;
  } catch (error) {
    console.error(`Error updating status of order with ID ${orderId}:`, error);
    throw error;
  }
};


export const sendCodOrderById = async (orderId, amountToCollect) => {
  try {
    const response = await axios.post(
      `${URL}/payment/cod/generate-link/${orderId}`,
      {}, 
      {
        params: { amountToCollect }, 
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error generating COD link for order ID ${orderId}:`, error);
    throw error;
  }
};