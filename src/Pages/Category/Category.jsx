import React , {useEffect,useState} from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Cta from '../../Components/CTA/Cta'
import HeroSection from '../../Components/HeroSection/HeroSection'
import { TiStarFullOutline } from "react-icons/ti";
import CategoryBox from '../../Components/CategoryBox/CategoryBox'
import { fetchProducts } from '../../Services/ProductService'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { IoFilterSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";


const Category = () => {

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
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
    <div>
       
       <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
       <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>
        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10'>  <HeroSection productName={"Cotton"}></HeroSection></div>

        <div className='px-6 md:px-14 py-3 flex justify-between lg:justify-end'>
            <div className='flex gap-2 border rounded-md p-2 items-center cursor-pointer block lg:hidden' onClick={() => setIsOpen(true)}>
                <span className='text-violet-800'><IoFilterSharp /></span>
                <h4>Filters</h4>
            </div>
            
            <div className='flex gap-2'>
            
            <div className='border rounded-md p-2'>
                Show 50
            </div>
            <div className='border rounded-md p-2'>
                Sort by:Featured
            </div>
            </div>
        </div>

           
            <div
              className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
              onClick={() => setIsOpen(false)}
            >
           
              <div
                className="bg-white w-2/3 md:w-2/5 h-full shadow-lg transform transition-transform"
                onClick={(e) => e.stopPropagation()} 
              >
                
                <div className='flex justify-between bg-black text-white p-3'>
                <h4 className='text-xl font-bold'>Menu</h4>
                <IoClose size={24} className="cursor-pointer mb-4" onClick={() => setIsOpen(false)} />
                </div>
                <div className='col-span-1 '>
                <div className='border rounded p-3 shadow-md'>
                    <h4 className='text-xl font-semibold'>Category</h4>
                    <ul>
                  
          {products.length > 0 ? (
            finalData.map((product, index) => (
              <li 
                key={index}
                className={`p-2 border border-1 rounded mt-2 cursor-pointer ${
                  selectedCategory === product.productName ? "bg-violet-200" : ""
                }`}
                onClick={() => setSelectedCategory(product.productName)}
              >
                <div className="flex justify-between font-medium">
                  <h5 className="text-base">{product.productName}</h5>
                  <div className="bg-violet-100 rounded-full w-6 h-6 flex justify-center items-center">
                    <h6 className="text-sm">{product.groupedVariants.length}</h6>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No products available</p>
          )}
        

                </ul>
                </div>    


                <div className='border rounded p-3 shadow-md mt-3'>
                <h4 className='text-xl font-semibold'>New Stock</h4>
                <ul className='divide-y-2 divide-dotted'>
                    <li className='pb-2 flex justify-between gap-4 mt-2 pt-2'>
                        <div className=''> 
                            <img src='/images/wool-item.png'></img>
                        </div>

                        <div className='flex-1'>
                            <h4 className='font-bold text-violet-800'>Wool - 2/92
                                <br></br>
                                (Pink)
                            </h4>
                            <p className='text-lg font-medium mt-2'>₹328.85</p>
                            <div className='flex justify-end'>
                                <div className='bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1'>
                                        <span className='text-yellow-300'><TiStarFullOutline /></span>
                                        <p>4.5</p>
                                </div>
                            </div>
                        </div>
                       
                    </li>

                    <li className='pb-2 flex justify-between gap-4 mt-2 pt-2'>
                        <div className=''> 
                            <img src='/images/wool-item.png'></img>
                        </div>

                        <div className='flex-1'>
                            <h4 className='font-bold text-violet-800'>Wool - 2/92
                                <br></br>
                                (Pink)
                            </h4>
                            <p className='text-lg font-medium mt-2'>₹328.85</p>
                            <div className='flex justify-end'>
                                <div className='bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1'>
                                        <span className='text-yellow-300'><TiStarFullOutline /></span>
                                        <p>4.5</p>
                                </div>
                            </div>
                        </div>
                       
                    </li>

                    <li className='pb-2 flex justify-between gap-4 mt-2 pt-2'>
                        <div className=''> 
                            <img src='/images/wool-item.png'></img>
                        </div>

                        <div className='flex-1'>
                            <h4 className='font-bold text-violet-800'>Wool - 2/92
                                <br></br>
                                (Pink)
                            </h4>
                            <p className='text-lg font-medium mt-2'>₹328.85</p>
                            <div className='flex justify-end'>
                                <div className='bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1'>
                                        <span className='text-yellow-300'><TiStarFullOutline /></span>
                                        <p>4.5</p>
                                </div>
                            </div>
                        </div>
                       
                    </li>
                </ul>

                </div>



            </div>
            </div>
            </div>
               

        <div className='grid grid-cols-4 px-6 md:px-14 py-3 gap-5 mt-10'>
            <div className='col-span-1 hidden lg:block'>
                <div className='border rounded p-3 shadow-md'>
                    <h4 className='text-xl font-semibold'>Category</h4>
            <ul>
                  
          {products.length > 0 ? (
            finalData.map((product, index) => (
              <li 
                key={index}
                className={`p-2 border border-1 rounded mt-2 cursor-pointer ${
                  selectedCategory === product.productName ? "bg-violet-200" : ""
                }`}
                onClick={() => setSelectedCategory(product.productName)}
              >
                <div className="flex justify-between font-medium">
                  <h5 className="text-base">{product.productName}</h5>
                  <div className="bg-violet-100 rounded-full w-6 h-6 flex justify-center items-center">
                    <h6 className="text-sm">{product.groupedVariants.length}</h6>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No products available</p>
          )}
        

                         {/* <li className='p-2 border border-1 rounded mt-2'>
                             <div className='flex justify-content-between font-medium'>
                                 <h5 className='text-base'>Silk Yarn</h5>
                                 <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                     <h6 className='text-sm'>11</h6>
                                 </div>
                             </div>
                         </li>

                         <li className='p-2 border border-1 rounded mt-2'>
                             <div className='flex justify-content-between font-medium'>
                                 <h5 className='text-base'>Jute Yarn</h5>
                                 <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                     <h6 className='text-sm'>11</h6>
                                 </div>
                             </div>
                         </li>

                         <li className='p-2 border border-1 rounded mt-2'>
                             <div className='flex justify-content-between font-medium'>
                                 <h5 className='text-base'>Nylon Yarn</h5>
                                 <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                     <h6 className='text-sm'>11</h6>
                                 </div>
                             </div>
                         </li>

                         <li className='p-2 border border-1 rounded mt-2'>
                             <div className='flex justify-content-between font-medium'>
                                 <h5 className='text-base'>Wool Yarn</h5>
                                 <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                     <h6 className='text-sm'>11</h6>
                                 </div>
                             </div>
                         </li>

                         <li className='p-2 border border-1 rounded mt-2'>
                             <div className='flex justify-content-between font-medium'>
                                 <h5 className='text-base'>Polyster Yarn</h5>
                                 <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                     <h6 className='text-sm'>11</h6>
                                 </div>
                             </div>
                         </li> */}
                    </ul>
                </div>    


                <div className='border rounded p-3 shadow-md mt-3'>
                <h4 className='text-xl font-semibold'>New Stock</h4>
                <ul className='divide-y-2 divide-dotted'>
                    <li className='pb-2 flex justify-between gap-4 mt-2 pt-2'>
                        <div className=''> 
                            <img src='/images/wool-item.png'></img>
                        </div>

                        <div className='flex-1'>
                            <h4 className='font-bold text-violet-800'>Wool - 2/92
                                <br></br>
                                (Pink)
                            </h4>
                            <p className='text-lg font-medium mt-2'>₹328.85</p>
                            <div className='flex justify-end'>
                                <div className='bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1'>
                                        <span className='text-yellow-300'><TiStarFullOutline /></span>
                                        <p>4.5</p>
                                </div>
                            </div>
                        </div>
                       
                    </li>

                    <li className='pb-2 flex justify-between gap-4 mt-2 pt-2'>
                        <div className=''> 
                            <img src='/images/wool-item.png'></img>
                        </div>

                        <div className='flex-1'>
                            <h4 className='font-bold text-violet-800'>Wool - 2/92
                                <br></br>
                                (Pink)
                            </h4>
                            <p className='text-lg font-medium mt-2'>₹328.85</p>
                            <div className='flex justify-end'>
                                <div className='bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1'>
                                        <span className='text-yellow-300'><TiStarFullOutline /></span>
                                        <p>4.5</p>
                                </div>
                            </div>
                        </div>
                       
                    </li>

                    <li className='pb-2 flex justify-between gap-4 mt-2 pt-2'>
                        <div className=''> 
                            <img src='/images/wool-item.png'></img>
                        </div>

                        <div className='flex-1'>
                            <h4 className='font-bold text-violet-800'>Wool - 2/92
                                <br></br>
                                (Pink)
                            </h4>
                            <p className='text-lg font-medium mt-2'>₹328.85</p>
                            <div className='flex justify-end'>
                                <div className='bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1'>
                                        <span className='text-yellow-300'><TiStarFullOutline /></span>
                                        <p>4.5</p>
                                </div>
                            </div>
                        </div>
                       
                    </li>
                </ul>

                </div>



            </div>

            <div className='col-span-4 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>

            {selectedCategory &&
                finalData
                .filter((product) => product.productName === selectedCategory)
                .flatMap((product) =>
                    product.groupedVariants.flatMap((size,i) =>
                        <CategoryBox
                        key={i}
                        size={size.size}
                        color={size.variants}
                        price={size.variants[0].price}
                        product={product}
                        />
                    )
                )}
                {/* <div>
                    <CategoryBox></CategoryBox>
                </div>

                <div>
                    <CategoryBox></CategoryBox>
                </div>

                <div>
                    <CategoryBox></CategoryBox>
                </div>

                <div>
                    <CategoryBox></CategoryBox>
                </div>


                <div>
                    <CategoryBox></CategoryBox>
                </div>


                <div>
                    <CategoryBox></CategoryBox>
                </div>

                <div>
                    <CategoryBox></CategoryBox>
                </div>

                <div>
                    <CategoryBox></CategoryBox>
                </div>


                <div>
                    <CategoryBox></CategoryBox>
                </div> */}




            </div>
        </div>



        <div className='px-6 md:px-14 py-3 mt-10'> <Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>

        <BottomNav></BottomNav>
    </div>
  )
}

export default Category