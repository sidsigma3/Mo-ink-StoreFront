import React , {useState,useEffect}from 'react'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import OrderBox from '../../Components/OrderBox/OrderBox'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { getCustomerOrderDetails, getOrderDetails } from '../../Services/OrderService'
import { useNavigate } from 'react-router-dom'

const OrderPage = () => {

  const navigate = useNavigate();


  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("userData"))


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getCustomerOrderDetails(user.customerId);
        setOrders(data); 
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    navigate(`/orderDetails`, { state: { order } });
  };
  


 
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
            {orders.filter(order => order.status !== 'PENDING').length > 0 ? (
              [...orders]
                .reverse()
                .filter(order => order.status !== 'PENDING')
                .map((order, index) => (
                  <li key={index} onClick={() => handleOrderClick(order)} className="cursor-pointer">
                    <OrderBox order={order} />
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