import React, { useState, useEffect } from 'react';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import HeroSection from '../../Components/HeroSection/HeroSection';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import OrderBox from '../../Components/OrderBox/OrderBox';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { getPaginatedCustomerOrders } from '../../Services/OrderService';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack  } from "react-icons/io";


const OrderPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("userData"));
  const customerId = user?.customerId;

 useEffect(() => {
  if (!customerId) return;

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPaginatedCustomerOrders(user.customerId, currentPage, 10);
      
      // Fix: Properly calculate total pages based on total orders
      if (data) {
        setOrders(data.orders || data || []); // Assuming orders are in data.orders or data directly
        
        // Calculate total pages based on total order count
        const totalOrders = data.totalOrders || data.total || 0;
        const itemsPerPage = 10;
        const calculatedTotalPages = Math.ceil(totalOrders / itemsPerPage);
        
        setTotalPages(calculatedTotalPages);
      } else {
        setOrders([]);
        setTotalPages(0);
      }
    } catch (err) {
      setError("Failed to load orders");
      console.error(err);
      setOrders([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [user.customerId, currentPage]);


  //  useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const data = await getCustomerOrderDetails(user.customerId);
  //       setOrders(data);
  //     } catch (error) {
  //       console.error("Failed to fetch orders:", error);
  //     }
  //   };

  //   fetchOrders();
  // }, []);



  const handleOrderClick = (order) => {
    navigate(`/orderDetails`, { state: { order } });
  };

  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "Account", link: "/account" },
    { label: "Orders", link: "/orders" },
  ];


    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'><NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'><Navbar /></div>
      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10'>
        <HeroSection productName={"Your Orders"} breadcrumbs={breadcrumbs} />
      </div>

      <div className="px-6 md:px-14 py-3">
        <ul className="flex flex-col gap-3">
          {orders.filter(order => order.status !== "PENDING" && order.status !== "FAILED").length > 0 ? (
              orders
                .filter(order => order.status !== "PENDING" && order.status !== "FAILED")
                .map((order, index) => (
                  <li key={index} onClick={() => handleOrderClick(order)} className="cursor-pointer">
                    <OrderBox order={order} />
                  </li>
                ))
            ) : (
              <p>No orders found</p>
            )}

        </ul>


       <div className="mt-6 flex justify-end">
  {totalPages > 1 && ( // Only show pagination if there's more than 1 page
    <nav className="inline-flex space-x-1">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className={`px-1 py-1 rounded-md border ${
          currentPage === 1 
            ? 'text-gray-400 border-gray-300 cursor-not-allowed' 
            : 'text-purple-800 border-purple-800 hover:bg-purple-100'
        }`}
      >
        <IoIosArrowBack />
      </button>

      {[...Array(totalPages).keys()].map((number) => {
        const page = number + 1;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === page 
                ? 'bg-purple-800 text-white border-purple-800' 
                : 'text-purple-800 border-purple-800 hover:bg-purple-100'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-1 py-1 rounded-md border ${
          currentPage === totalPages 
            ? 'text-gray-400 border-gray-300 cursor-not-allowed' 
            : 'text-purple-800 border-purple-800 hover:bg-purple-100'
        }`}
      >
        <IoIosArrowForward />
      </button>
    </nav>
  )}
</div>

      </div>

      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'><Footer /></div>
      <BottomNav />
    </div>
  );
};

export default OrderPage;
