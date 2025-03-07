import React , {useState , useEffect , useCallback} from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import ProductDetailBoxMini from '../../Components/ProductList/ProductDetailBoxMini'
import { RiLock2Line } from "react-icons/ri";
import { getCart } from '../../Services/CartService'
import { fetchProducts } from '../../Services/ProductService'
import { RxCross2 } from "react-icons/rx";
import { removeFromCart } from '../../Services/CartService'
import { FaPlus } from "react-icons/fa6";
import { Dropdown, DropdownHeader, DropdownToggle } from 'react-bootstrap'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { IoClose } from "react-icons/io5";
import { getAllDiscounts } from '../../Services/DiscountService'
import AddressBox from '../../Components/AddressBox/AddressBox'
import { useNavigate } from 'react-router-dom'
import { BiHomeAlt } from "react-icons/bi";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { BiBuildingHouse } from "react-icons/bi";

const CheckoutPage = () => {

    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPayment,setSelectedPayment] = useState('Select Payment type')
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [discounts, setDiscounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType,setSelectedType] = useState('HOME')

    useEffect(() => {
        if (isSidebarOpen) {
          fetchDiscounts();
        }
      }, [isSidebarOpen]);
    
      const fetchDiscounts = async () => {
        try {
          setLoading(true);
          const data = await getAllDiscounts();
          setDiscounts(data.data); 
        } catch (error) {
          console.error("Failed to load discounts", error);
        } finally {
          setLoading(false);
        }
      };

    const customer = JSON.parse(localStorage.getItem("userData") || "{}");
    
    const fetchOrders = useCallback(async () => {
        if (!customer?.customerId) return;
      
        setLoading(true);
        try {
          // Fetch cart items from API
          const cartResponse = await getCart(customer.customerId);
          const cartData = cartResponse?.data?.cartItems || [];
      
          // Fetch all products from local storage or API
          let allProducts = JSON.parse(localStorage.getItem("allProducts"));
      
          if (!allProducts) {
            const productResponse = await fetchProducts();
            allProducts = productResponse?.data || [];
            localStorage.setItem("allProducts", JSON.stringify(allProducts)); // Cache products
          }
      
          // Map the cart items with product details
          const cartProducts = cartData.map((item) => {
            const product = allProducts.find((p) =>
              p.variants.some((v) => v.id === item.variantId)
            );
            const variant = product?.variants.find((v) => v.id === item.variantId);
      
            return {
              productName: product?.productName || "Unknown Product",
              size: variant?.size || "Unknown",
              colorName: variant?.color?.colorName || "Unknown",
              price: variant?.pricePerKg || 0,
              variantId: variant?.id || 0,
              quantity: item.quantity,
              productImage: product?.productImage?.[0] || "/images/default.png", // Default image
            };
          });
      
          setCartItems(cartProducts);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setLoading(false);
        }
      }, [customer.customerId]);
      
      useEffect(() => {
        fetchOrders();
      }, [fetchOrders]);
    

      const handleRemoveFromCart = async (variantId) =>{
        if (!customer?.customerId) {
          alert("Please log in to add items to your cart.");
          return;
        }
      
        try {
          await removeFromCart(customer.customerId, variantId);
          fetchOrders()
          alert("Item removed from cart successfully!"); // Success message
        } catch (error) {
          alert("Failed to remove item from cart!");
        }
      }


      const handleSelectPayment = (type) =>{
        setSelectedPayment(type)
      }
    
      const filteredDiscounts = discounts.filter((discount) =>
        discount.discountCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedAddress = customer.addresses.find(
        (addr) => addr.addressType === selectedType
      ) || customer.addresses[0];

  return (
    <div>
        <div className=' py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-5 py-3'> <Navbar></Navbar></div>
        
        <div className='px-5 py-3'>
            <HeroSection productName={"Check out"}></HeroSection>
        </div>

        <div className='px-5 py-3 gap-5'>
        <h5 className='font-bold text-2xl'>Review your cart</h5>
            {cartItems.length > 0 ? (
                  <ul className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                  {cartItems.map((item,index)=>(
                      <li key={index} className='border rounded-lg'>
                          <div className="position-relative">
                          <button onClick={()=>handleRemoveFromCart(item.variantId)} className="rounded-full border-2 position-absolute -top-2 -right-2 z-20 border-violet-800 text-violet-800 font-bold">
                              <RxCross2 size={20}/>
                          </button>
                          <ProductDetailBoxMini
                             productName={item.productName}
                             price={item.price}
                             size={item.size}
                             color={item.colorName}
                             itemQuantity={item.quantity}
                          ></ProductDetailBoxMini>
                          </div>
                      </li>
                  ))}           
              </ul>
            ):(
                <div className='py-5'>
                <p className='text-center text-xl font-medium'>No cart items found.</p>
                </div>
            )}
        

            <div className='p-2 flex-1 mt-3'>
                
                <div className='flex justify-between'>
                    <h5 className='font-bold text-2xl'>Shipping Address</h5>
                    <button onClick={()=>navigate('/address')} className='flex items-center gap-2 border-1 p-2 rounded-md border-violet-700 text-violet-800 text-lg font-semibold'><span><FaPlus /></span> ADD NEW ADDRESS</button>
                </div>


                {selectedAddress && (
                <div className='flex justify-between mt-3 border p-3 rounded-md'>
                <div>
                    <h4>
                    Deliver to: <span className='font-semibold'>{customer.customerName}</span>
                    </h4>
                    <p>{selectedAddress.customerAddress}</p>
                    <p>{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state}</p>
                    <p>{selectedAddress.zipcode}, {selectedAddress.country}</p>
                </div>

                {/* Address Selection Dropdown */}
                <div>
                    <Dropdown >
                    <Dropdown.Toggle className='font-semibold bg-violet-200 flex items-center text-violet-800 w-36 justify-between' variant="light" id="dropdown-basic">
                        {selectedType}
                        {selectedType === 'HOME' ? (
                            <span><BiHomeAlt size={20}/></span>
                        ) : selectedType === 'WORK' ? (
                            <span><PiSuitcaseSimpleBold size={20}/></span>
                        ) : (
                            <span><BiBuildingHouse size={20}/></span>
                        )}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {["HOME", "WORK", "OTHER"].map((type) => (
                        <Dropdown.Item
                            key={type}
                            onClick={() => setSelectedType(type)}
                        >
                            {type}
                        </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
                </div>
            )}

                {/* { <ul className='flex flex-col gap-3 mt-3'>
                    {
                        customer.addresses.map((item,index)=>(
                            <li key={index}>
                                <AddressBox address={item} name={customer.customerName} company={customer.company} phone={customer.phoneNumber}></AddressBox>
                            </li>
                        ))
                    }
                     </ul>
                    } */}


                {/* <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Full name <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter full name'></input>
                </div>

                <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Email address <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter Email'></input>
                </div>

                <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Calling number <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter number'></input>
                </div>

                <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Whatsapp number <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter number'></input>
                </div>

                <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Country <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Choose'></input>
                </div>

                    <div className='block md:flex gap-2'>
                            <div className='mt-6 flex-1 flex flex-col gap-1'>
                                <label className='font-semibold text-lg'>City <span className='text-red-900'>*</span></label>
                                <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter City'></input>
                            </div>

                            <div className='mt-6 flex-1 flex flex-col gap-1'>
                                <label className='font-semibold text-lg'>State <span className='text-red-900'>*</span></label>
                                <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter State'></input>
                            </div>

                            <div className='mt-6 flex-1 flex flex-col gap-1'>
                                <label className='font-semibold text-lg'>Zip Code <span className='text-red-900'>*</span></label>
                                <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter Zip code'></input>
                            </div>

                    </div>

                    <div className='flex gap-2 mt-6'>
                        <input type='checkbox'></input>
                        <p>I have read and agree to the Terms and Conditions</p>
                    </div> */}

                    <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <div className=''>
                        <h5 className='font-bold text-2xl'>Payment</h5>
                        <Dropdown onSelect={handleSelectPayment}  size="sm" className='mt-2'>
                           <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center justify-content-between gap-2 w-100">
                             <p className="m-0">{selectedPayment}</p>
                           </Dropdown.Toggle>
                            <Dropdown.Menu className='w-full'>
                                <Dropdown.Item eventKey={"100%"}>
                                    <div className='p-2 border-bottom'>
                                        <h4 className='text-xl font-medium'>Pay <span className='text-violet-800'>100%</span> in Online & <span className='text-violet-800'>0%</span> Cash on delivery</h4>
                                        <h5>Flat 1.50% discount is applied to your order total.</h5>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item eventKey={"75%"}>
                                    <div className='p-2 border-bottom'>
                                        <div>
                                        <h4 className='text-xl font-medium'>Pay <span className='text-violet-800'>75%</span> in Online & <span className='text-violet-800'>25%</span> Cash on delivery</h4>
                                        <h5>Flat 0.75% discount is applied to your order total.</h5>
                                        </div>

                                        <div className=''>
                                            Recommended
                                        </div>

                                    </div>
                                </Dropdown.Item>

                                <Dropdown.Item eventKey={"50%"}>
                                    <div className='p-2 border-bottom'>
                                        <h4 className='text-xl font-medium'>Pay <span className='text-violet-800'>50%</span> in Online & <span className='text-violet-800'>50%</span>Cash on delivery</h4>
                                        <h5>Flat 0.50% discount is applied to your order total.</h5>
                                    </div>
                                </Dropdown.Item>

                                <Dropdown.Item eventKey={"25%"}>
                                    <div className='p-2 border-bottom'>
                                        <h4 className='text-xl font-medium'>Pay <span className='text-violet-800'>25%</span>in Online & <span className='text-violet-800'>75%</span> Cash on delivery</h4>
                                        <h5>Flat 0.50% discount is applied to your order total.</h5>
                                    </div>
                                </Dropdown.Item>

                                <Dropdown.Item eventKey={"0%"}>
                                    <div className='p-2 border-bottom'>
                                        <h4 className='text-xl font-medium'>Pay <span className='text-violet-800'>0%</span> in Online & <span className='text-violet-800'>100%</span> Cash on delivery</h4>
                                        <h5>No discount is avilable for only cash on delivery payment.</h5>
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </div>

                         <div className="">
                            <h5 className="font-bold text-2xl">Discounts</h5>
                            <Dropdown className='mt-2'>
                            <Dropdown.Toggle
                                variant="light"
                                id="dropdown-basic"
                                className="d-flex align-items-center justify-content-between gap-2 w-100"
                                onClick={() => setIsSidebarOpen(true)} // Open sidebar on click
                            >
                                Select Discount
                            </Dropdown.Toggle>
                            </Dropdown>
                        </div>
                    </div>

                    <div
                        className={`fixed top-0 right-0 w-84 h-full bg-white shadow-lg transform transition-transform ${
                        isSidebarOpen ? "translate-x-0" : "translate-x-full"
                        } z-50 p-4`}
                    >
                        {/* Close Button */}
                        <button
                        className="absolute top-4 right-4 text-gray-600 hover:text-black"
                        onClick={() => setIsSidebarOpen(false)} // Close sidebar
                        >
                        <IoClose size={24} />
                        </button>

                        {/* Sidebar Content */}
                        <h4 className="font-bold text-xl mb-4">Apply Coupon</h4>
                        {loading ? (
                            <p className="text-center text-gray-500">Loading discounts...</p>
                            ) : discounts.length > 0 ? (

                                <div>
                                
                                <div>
                                    <input 
                                        className='border-2 rounded-md p-2 w-full' 
                                        placeholder='Enter Coupon Code'
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <h4 className='font-semibold text-lg mt-3'>Best Coupon</h4>

                            <ul className="space-y-2 mt-3">
                                { filteredDiscounts.map((discount) => (
                                <li key={discount.discountId} className="border rounded-xl flex">
                                    <div className='bg-violet-800 w-10  relative rounded-l-xl'>
                                    <h4 className="-rotate-90 text-sm font-bold text-white -translate-x-4 translate-y-12 w-20"> {discount.discountValue}{discount.discountType === 'Percentage' ? '%' : '₹'} OFF</h4>
                                        <div className="absolute top-4 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                        <div className="absolute top-8 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                        <div className="absolute top-12 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                        <div className="absolute top-16 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                        <div className="absolute top-20 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                        <div className="absolute top-24 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                        <div className="absolute top-28 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                    <div className='flex-1 p-2'>
                                        <div className='flex justify-between'>
                                            <h3 className="font-semibold text-xl">{discount.discountCode}</h3>
                                            <h5 className='text-violet-800 font-bold text-md'>APPLY</h5>
                                        </div>
                                        <h4 className='text-green-600 font-semibold mt-2 border-b-2 border-dotted pb-2'>Save ₹{2103} on this order!</h4>
                                        <h4 className='mt-4 font-medium'>Use Code {discount.discountCode} Get {discount.discountValue} {discount.discountType === 'Percentage' ? '%' : '₹'} off as <br></br>discount bonus</h4>
                                       
                                    </div>
                                  
                                </li>
                                ))}
                            </ul>

                            </div>
                            ) : (
                            <p className="text-center text-gray-500">No discounts available.</p>
                            )}
                    </div>

                 
                    {isSidebarOpen && (
                        <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsSidebarOpen(false)}
                        ></div>
                    )}


                    {/* <div className='mt-6'>
                        <h5 className='font-bold text-2xl'>Payment</h5>

                        <div className='flex justify-between mt-4'>
                            <div className='border-violet-800 border-1 font-medium p-1 rounded-md bg-violet-100'>
                                Pay <span className='text-violet-800'>25%</span> in advance
                            </div>

                            <div className='border-violet-800 border-1 font-medium p-1 rounded-md bg-white-100'>
                                Pay <span className='text-violet-800'>50%</span> in advance
                            </div>

                            <div className='border-violet-800 border-1 font-medium p-1 rounded-md bg-white-100'>
                                Pay <span className='text-violet-800'>75%</span> in advance
                            </div>

                            <div className='border-violet-800 border-1 font-medium p-1 rounded-md bg-white-100'>
                                Pay <span className='text-violet-800'>Full</span> in advance
                            </div>
                        </div>

                        <h6 className='mt-6'>Flat<span className='text-violet-800'> 25%</span> discount is applied to your order total</h6>

                    </div> */}

                    {/* <div className='mt-6'>
                        <div className='flex gap-2 border-1 rounded-t-md bg-violet-100 border-violet-800 p-3'>
                            <input type='radio'></input>
                            <h5 className='font-semibold'>Credit card</h5>
                        </div>
                        
                        <div className='grid grid-cols-2 gap-2 bg-gray-100 p-3 border'>
                            <input placeholder='Card number' className='col-span-2 border-1 border-gray-300 h-10 p-1 rounded-md'></input>
                        
                          
                            <input placeholder='Expiration date(MM/YY)' className='border-1 border-gray-300 h-10 p-1 rounded-md'></input>
                        
                            <input placeholder='Security code' className='border-1 border-gray-300 h-10 p-1 rounded-md'></input>
                        

                            <input placeholder='Name on card' className='col-span-2 border-1 border-gray-300 h-10 p-1 rounded-md'></input>
                        
                        </div>

                        <div className='flex gap-2 p-3 border-1 rounded-b-md'>
                            <input type='radio'></input>
                            <h5 className='font-semibold'>Cash on Delivery(COD)</h5>
                        </div>

                    </div> */}

                    <div className='mt-6'>

                        <button className='bg-violet-900 text-white p-3 rounded-md w-full'>PAY NOW</button>
                    </div>


                    <div className='mt-6'>
                        <h4 className='font-semibold flex gap-2'><span className='text-violet-800'><RiLock2Line size={20}/></span>Ensure Checkout- SSL Encrypted</h4>
                        
                        <p className='text-slate-400 mt-2'>Ensuring your financial and personal details are secure during every transaction</p>
                    </div>


            </div>

           


            <div className='p-2 flex-1'>
                

                 <div className='border-1 rounded-md p-3 mt-10'>
                       
        
                        <table className='w-100   rounded mt-2 font-semibold'>
                            
                            <tbody>
                                 <tr>
                                    <td>Item Totol(+gst)</td>
                                    <td>9 items</td>
                                    <td style={{textAlign:'end'}}>₹3,07,458</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <p>Item Discount</p>
                                            <p className='text-gray-400 pl-12'>By payment Type</p>
                                            <p className='text-gray-400 pl-12'>By coupon Code</p>
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            <p>10.75%</p>
                                            <p className='text-gray-400'>0.75%</p>
                                            <p className='text-gray-400'>10%</p>
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            <p className='text-end'>1856</p>
                                            <p className='text-gray-400 text-end'>856</p>
                                            <p className='text-gray-400 text-end'>1000</p>
                                        </div>
                                    </td>

                                </tr>

                                <tr className='border-b-2'>
                                    <td className='pb-4'>Shipping or Delivery</td>
                                    <td></td>
                                    <td className='text-end'>₹3542</td>
                                </tr>

                                <tr>
                                    <td>TO pay</td>
                                    <td></td>
                                    <td className='text-end'>₹3,20,470</td>
                                </tr>

                                <tr className='border-b-2'>
                                    <td>Wallet Ballance</td>
                                    <td className='pb-4'>₹4116</td>
                                    <td style={{textAlign:'end'}}>
                                    <input placeholder='Enter amount' className='w-28 border-1 border-gray-300 rounded-md ps-2'></input>
                                    </td>
        
                                </tr>

                                <tr className='border-b-2'> 
                                    <td className='pb-4'>Net pay</td>
                                    <td></td>
                                    <td className='text-end'>₹3,20,470</td>
                                </tr>

                                <tr>
                                    <td>COD (After delivery)</td>
                                    <td className=''>25%</td>
                                    <td className='text-end'>₹80,170</td>
                                </tr>

                                <tr>
                                    <td>Online Payment (Now)</td>
                                    <td className=''>75%</td>
                                    <td className='text-end'>₹2,40,353</td>
                                </tr>



                                {/* <tr>
                                    <td>Discounts by payment</td>
                                    <td>5%</td>
                                    <td style={{textAlign:'end'}}>₹748</td>
                                    
                                </tr>
        
                                <tr>
                                    <td>Discounts</td>
                                    <td>5%</td>
                                    <td style={{textAlign:'end'}}>-₹5,000</td>
                                    
                                </tr>
        
                                <tr>
                                    <td>Shipping or delivery</td>
                                    <td></td>
                                    <td style={{textAlign:'end'}}>₹2,156</td>
                                    
                                </tr> */}

                                {/* <tr>
                                    <td>SubTotal</td>
                                    <td></td>
                                    <td style={{textAlign:'end'}}>₹2,121,156</td>
                                    
                                </tr>

                                <tr className='border-b-4'>
                                    <td>Remaining Balance</td>
                                    <td></td>
                                    <td style={{textAlign:'end'}}>₹3,526,379</td>
                                    
                                </tr>
        
                                <tr className=''>
                                    <td>Total</td>
                                    <td></td>
                                    <td style={{textAlign:'end'}}>₹2,121,156</td>
                                    
                                </tr> */}
        
        
        
        
                            </tbody>
                        </table>
        
                      
        
                    </div>

            </div>




        </div>








        <div className='px-5 py-3 mt-10'><Cta></Cta></div>
        <div className='px-5 py-3'> <Footer></Footer></div>

        <BottomNav></BottomNav>
    </div>
  )
}

export default CheckoutPage