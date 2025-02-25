import React ,{useState,useEffect} from 'react'
import ProductDetailBox from './ProductDetailBox'
import { fetchProducts } from '../../Services/ProductService';

const ProductList = () => {
    
    const [products, setProducts] = useState([]);

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


    const aggregateProductData = (productData) => {
        return productData.map((product) => {
          const groupedVariants = product.variants.reduce((acc, variant) => {
            const { size, color, availableWeight ,id } = variant;
      
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
                available:variant.availableWeight,
                price:variant.pricePerKg,
                id:variant.id,
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
            compareAtPrice:product.productPrice?.compareAtPrice,
            costPerItemPerKg:product.productPrice?.costPerItemPerKg,
            gstOnProduct:product.productPrice?.gstOnProduct,
            pricePerKg:product.productPrice?.pricePerKg,
            availableStatus:product.availableStatus,
            groupedVariants: Object.values(groupedVariants),
          };
        });
      };
    
    
    const finalData = aggregateProductData(products)

    console.log(finalData)


  return (
    <div className=''>

        <ul className='mt-4 overflow-auto d-flex gap-3'>
            {/* <li>
                <ProductDetailBox></ProductDetailBox>
            </li>

            <li>
                <ProductDetailBox></ProductDetailBox>
            </li>


            <li>
                <ProductDetailBox></ProductDetailBox>
            </li>

            <li>
                <ProductDetailBox></ProductDetailBox>
            </li>

            <li>
                <ProductDetailBox></ProductDetailBox>
            </li> */}

                {products.length > 0 ? (
                finalData.map((product, index) =>
                    product.groupedVariants.map((size, ix) =>
                    size.variants.map((color, i) => (
                        <li key={`${index}-${ix}-${i}`}>
                        <ProductDetailBox
                            productName={product.productName}
                            size={size.size}
                            color={color.colorName}
                            price={color.price}
                            variantId={color.id}
                        />
                        </li>
                    ))
                    )
                )
                ) : (
                <p>No products available</p>
                )}

        </ul>

    </div>
  )
}

export default ProductList