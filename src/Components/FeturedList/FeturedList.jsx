import React , {useState,useEffect} from 'react'
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


  const handleNavigation = () =>{
      navigate("/category")
  }


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
          products.map((product, index) => (
            <li key={index} onClick={handleNavigation}>
              <FeturedBox productName={product.productName}   number={new Set(product.variants.map(variant => variant.size)).size}  />
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