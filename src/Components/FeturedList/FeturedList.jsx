import React, { useState, useEffect } from 'react'
import FeturedBox from './FeturedBox'
import { fetchProducts } from '../../Services/ProductService';
import { useNavigate } from 'react-router-dom';

const FeturedList = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      if (response.success) {
        setProducts(response.data);
      } else {
        console.error(response.message);
      }
    };

    getProducts();
  }, []);


  const handleNavigation = () => {
    navigate("/category")
  }


  const aggregateProductData = (productData) => {
    return productData.map((product) => {
      const groupedVariants = product.variants.reduce((acc, variant) => {
        const { size, color, availableWeight, id } = variant;

        if (!acc[size]) {
          acc[size] = {
            id,
            size,
            variants: [],
            totalWeight: 0,
          };
        }



        // Add unique colors for this size
        if (!acc[size].variants.some((v) => v.colorName === color.colorName)) {
          acc[size].variants.push({
            colorName: color.colorName,
            hexCode: color.hexCode || "#ccc",
            available: variant.availableWeight,
            price: variant.pricePerKg,
            id: variant.id,
          });
        }

        // Accumulate availableWeight for this size
        acc[size].totalWeight += Number(availableWeight);

        return acc;
      }, {});

      // Return the aggregated product with grouped variants
      return {
        productId: product.id,
        productName: product.productName,
        productDescription: product.productDescription,
        productImage: product.productImage,
        compareAtPrice: product.productPrice?.compareAtPrice,
        costPerItemPerKg: product.productPrice?.costPerItemPerKg,
        gstOnProduct: product.productPrice?.gstOnProduct,
        pricePerKg: product.productPrice?.pricePerKg,
        availableStatus: product.availableStatus,
        groupedVariants: Object.values(groupedVariants),
      };
    });
  };


  return (
    <div className='mt-2 bg-violet-100 px-6 md:px-14 pb-10'>

      <h3 className='text-xl md:2xl font-medium pt-14'>Featured Categories</h3>

      {/* <ul className='overflow-auto m-0 d-flex gap-3 justify-content-around mt-5'>
            <li><FeturedBox productName={'Cotton Yran'} number={2}></FeturedBox></li>
            <li><FeturedBox productName={'Nylon Yran'} number={5}></FeturedBox></li>
            <li><FeturedBox productName={'Special Yran'} number={7}></FeturedBox></li>
            <li><FeturedBox productName={'Wool Yarn'} number={12}></FeturedBox></li>
            <li><FeturedBox productName={'Wool Yarn'} number={12}></FeturedBox></li>
            <li><FeturedBox productName={'Wool Yarn'} number={12}></FeturedBox></li>
        </ul> */}

      <ul className="overflow-auto m-0 d-flex gap-3 justify-content-around mt-5">
        {products.length > 0 ? (
          aggregateProductData(products).map((product, index) => {
            return (
              <li key={index} onClick={handleNavigation}>
                <FeturedBox productName={product.productName} color={product.groupedVariants.map((group) => group.variants.length).reduce(
                  (accumulator, currentValue) => accumulator + currentValue, 0,
                )} number={product.groupedVariants.length} />
              </li>)
          })
        ) : (
          <p>No products available</p>
        )}
      </ul>


    </div>
  )
}

export default FeturedList