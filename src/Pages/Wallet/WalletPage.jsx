import React, { useState, useEffect } from "react";
import NavbarHeader from "../../Components/NavbarHeader/NavbarHeader";
import Navbar from "../../Components/Navbar/Navbar";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Cta from "../../Components/CTA/Cta";
import Footer from "../../Components/Footer/Footer";
import { RiFilePaper2Line } from "react-icons/ri";
import { getWalletTransactions } from "../../Services/CustomerService";
import BottomNav from "../../Components/BottomNav/BottomNav";
import { ArrowDownToLine } from 'lucide-react';
import { downloadCreditReceipt } from "../../Services/InvoiceService";

const WalletPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [customer, setCustomer] = useState(null); // Store customer data properly

  useEffect(() => {
    const storedCustomer = JSON.parse(localStorage.getItem("userData") || "null");
    if (storedCustomer?.customerId) {
      setCustomer(storedCustomer);
    }
  }, []); // Runs once on mount to get customer data

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!customer) return;

      setLoading(true);
      try {
        const data = await getWalletTransactions(customer.customerId);
        setTransactions(data || []); // Assuming response has a transactions array

      setWalletBalance(data[data.length-1].totalAmount || 0); // Assuming response has a balance field


      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setLoading(false);
      }

      
    };

    
    if (customer) {
      fetchTransactions();
    }
  }, [customer]);


  const handleDownloadCreditReceipt = async (source) => {
    const lowerSource = source.toLowerCase();
    const isCancellation = lowerSource.includes("cancellation");
    const isReturn = lowerSource.includes("return");
  
    // Extract orderId (last number after 'order:') and optionally returnedId (number after 'item:')
    const orderIdMatch = source.match(/order:\s*(\d+)/i);
    const returnedIdMatch = source.match(/item:\s*(\d+)/i);
  
    const orderId = orderIdMatch ? orderIdMatch[1] : null;
    const returnedId = returnedIdMatch ? returnedIdMatch[1] : null;
  
    if (!orderId || (!isCancellation && !isReturn)) {
      console.error("Invalid source format:", source);
      return;
    }
  
    const type = isCancellation ? "cancelled" : "returned";
  
    try {
      if (type === "returned") {
        if (!returnedId) {
          console.error("Returned ID missing for return type");
          return;
        }
        await downloadCreditReceipt(orderId, type, returnedId);
      } else {
        await downloadCreditReceipt(orderId, type);
      }
    } catch (error) {
      console.error("Failed to download credit receipt:", error);
    }
  };
  
  
 


  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "Account", link: "/account" },
    { label: "Wallet", link: "/wallet" },
  ];

  return (
    <div>
       <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>
        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10'> 
        <HeroSection productName={"Wallet"} breadcrumbs={breadcrumbs}/>
      </div>

      {/* Wallet Balance */}
      <div className="bg-violet-100  p-2 text-center md:text-left mt-6">
        <h3 className="text-xl font-bold">Wallet Balance:</h3>
        <h3  className="text-xl font-bold text-green-500">₹{walletBalance.toFixed(0)}</h3>
      </div>

      {/* Transaction Table */}
      <div className="px-6 md:px-14 mt-6">
        {loading ? (
          <div className="py-5 text-gray-500 flex flex-col items-center">
            <span>Loading...</span>
          </div>
        ) : transactions.length > 0 ? (
          <div>
            <h3 className="text-xl md:text-2xl font-semibold my-3">Last Transactions</h3>
            <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 ">
              <thead>
                <tr className="bg-gray-100 text-center">
                  <th className="border border-gray-300 p-2">Source</th>
                  {/* <th className="border border-gray-300 p-2">Invoice No.</th> */}
                  {/* <th className="border border-gray-300 p-2">Type</th> */}
                  <th className="border border-gray-300 p-2">Amount</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th  className="border border-gray-300 p-2" >Credit Note</th>

                </tr>
              </thead>
              <tbody>
                {transactions.slice().reverse().map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 p-2">{item.source}</td>
                    {/* <td class="text-center border border-gray-300">
                      <span class="text-sm font-medium text-gray-700">INV-10234</span>
                    </td> */}
                    {/* <td
                      className="border border-gray-300 p-2 text-sm font-semibold"
                      style={{ color: item.type === "CREDIT" ? "#3CAA82" : "#FF0000" }}
                    >
                      {item.type}
                    </td> */}

                    <td className="border border-gray-300 p-2"
                        style={{
                          color: item.type === "CREDIT" ? "#3CAA82" : "#FF0000", 
                        }}
                      >
                        {item.type === "DEBIT" ? "−" : ""}
                        ₹{item.amount.toFixed(0)} 
                      </td>
                         
                    <td className="border border-gray-300 p-2">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    {(item.source?.includes("Refund for cancellation") || item.source?.includes("Refund for return")) && (
                      <td className="text-center border border-gray-300">
                        <button
                          className="text-violet-800 hover:text-violet-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadCreditReceipt(item.source);
                          }}
                        >
                         <ArrowDownToLine size={20} />
                        </button>
                      </td>
                    )}

                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-80 items-center justify-center gap-3 text-gray-400">
            <RiFilePaper2Line size={60} />
            <h4>There's no transaction till now!</h4>
          </div>
        )}
      </div>

      <div className="px-6 md:px-14 py-3 mt-10">
        <Cta />
      </div>
      <div className="px-6 md:px-14 py-3">
        <Footer />
      </div>
      <BottomNav></BottomNav>
    </div>
  );
};

export default WalletPage;
