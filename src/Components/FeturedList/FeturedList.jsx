import React , {useState,useEffect} from 'react'
import FeturedBox from './FeturedBox'
import { fetchProducts } from '../../Services/ProductService';

const FeturedList = () => {

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


  return (
    <div className=' mt-2 bg-violet-100 px-5 pb-10'>

        <h3 className='text-3xl font-medium pt-14'>Featured Categories</h3>

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
          products.map((product, index) => (
            <li key={index}>
              <FeturedBox productName={product.productName} number={10 || 0} />
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>

       
    </div>
  )
}

export default FeturedList