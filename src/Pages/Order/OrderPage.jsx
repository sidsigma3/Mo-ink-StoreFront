import React , {useState,useEffect}from 'react'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import OrderBox from '../../Components/OrderBox/OrderBox'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { getOrderDetails } from '../../Services/OrderService'

const OrderPage = () => {


  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("userData"))


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderDetails(user.customerId);
        setOrders(data); 
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);


 
  console.log(orders)
  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "Account", link: "/account" },
    { label: "Orders", link: "/orders" },
  ];

  return (
    <div>
        <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>
        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10'>  <HeroSection productName={"Your Orders"} breadcrumbs={breadcrumbs}></HeroSection></div>


        <div className="px-6 md:px-14 py-3">
        <ul className="flex flex-col gap-3">
          {orders.length > 0 ? (
            orders.variants.map((variant,index) => (
              <li key={index}>
                <OrderBox order={orders} variants={variant}/>
              </li>
            ))
          ) : (
            <p>No orders found</p>
          )}
        </ul>
      </div>


        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        <BottomNav></BottomNav>
    </div>
  )
}

export default OrderPage