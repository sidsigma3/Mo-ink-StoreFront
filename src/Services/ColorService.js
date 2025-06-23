import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL + '/colors';

export const getColorLibraryByProductId = async (productId) => {
  const response = await axios.get(`${BASE_URL}/product/${productId}`);
  return response.data?.data?.colors || [];
};


export const getUnusedActiveColors = async (productId, size, variantType) => {
  const response = await axios.get(
    `${BASE_URL}/product/${productId}/variant/unused-active-colors`,
    {
      params: {
        size,
        variantType,
      },
    }
  );
  return response.data?.data?.colors || [];
};
