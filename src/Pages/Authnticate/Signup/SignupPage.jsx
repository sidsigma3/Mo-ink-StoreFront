import React ,{useState} from 'react'
import "./SignupPage.css"
import ToggleBtn from '../../../Components/Buttons/ToggleButton/ToggleBtn'
import { createCustomer } from '../../../Services/CustomerService'

const SignupPage = ({ togglePage ,isLogin}) => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        whatsappNumber: "",
        email: "",
        password: "",
        company: "",
        gstNumber: "",
        panNumber: "",
        cancelledCheque: "",
        customerAddress: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        addressType: "WORK",
        customerStatus: "ACTIVE",
        customerTypes: "WEAVER",
      });
    
      const [loading, setLoading] = useState(false);
    
      // Handle input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        // Constructing the request body with only necessary fields
        const customerData = {
          customerName: `${formData.firstName} ${formData.lastName}`.trim(), // Combine first and last name
          phoneNumber: formData.phoneNumber || null, // Send null if empty
          whatsappNumber: formData.whatsappNumber || null,
          email: formData.email,
          password: formData.password,
        //   company: formData.company || null,
        //   gstNumber: formData.gstNumber || null,
        //   panNumber: formData.panNumber || null,
        //   cancelledCheque: formData.cancelledCheque || null,
          customerStatus: "ACTIVE",
          customerTypes: "WEAVER",
        };
      
        try {
          const response = await createCustomer(customerData);
          alert("Account created successfully!");
          console.log("Customer Created:", response);
        } catch (error) {
          alert("Failed to create account!");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      

  return (
    <div className="signup-page">
    <div className="signup-page-ctn">
      <div className="logo-ctn">
        <img src="/images/logo.png" alt="Logo" />
      </div>

      <div className="left-ctn">
        <h6 className="welcome">Welcome to Moink & Dyes</h6>
        <ToggleBtn click={togglePage} status={!isLogin} />

        <h6 className="mt-3">Create your account to get started</h6>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mt-4 gap-2">
            <div className="d-flex flex-column gap-2 flex-1">
              <label>First Name</label>
              <input
                className="login-input rounded-pill"
                placeholder="Enter your first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex flex-column gap-2 flex-1">
              <label>Last Name</label>
              <input
                className="login-input rounded-pill"
                placeholder="Enter your last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="d-flex flex-column gap-2">
            <label>Email</label>
            <input
              className="login-input rounded-pill"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex flex-column gap-2 mt-4">
            <label>Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between mt-4 gap-2">
            <div className="d-flex flex-column gap-2 flex-1">
              <label>Phone</label>
              <input
                className="login-input rounded-pill"
                placeholder="Enter your phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column gap-2 flex-1">
              <label>WhatsApp</label>
              <input
                className="login-input rounded-pill"
                placeholder="Enter your WhatsApp number"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* <div className="d-flex flex-column gap-2 mt-4">
            <label>Address</label>
            <input
              className="login-input rounded-pill"
              placeholder="Enter your address"
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column gap-2 mt-4">
            <label>City</label>
            <input
              className="login-input rounded-pill"
              placeholder="Enter your city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column gap-2 mt-4">
            <label>State</label>
            <input
              className="login-input rounded-pill"
              placeholder="Enter your state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column gap-2 mt-4">
            <label>Country</label>
            <input
              className="login-input rounded-pill"
              placeholder="Enter your country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column gap-2 mt-4">
            <label>Zip Code</label>
            <input
              className="login-input rounded-pill"
              placeholder="Enter your zip code"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />
          </div> */}

          <div className="d-flex justify-content-between mt-3">
            <div className="d-flex gap-2">
              <input type="checkbox" />
              <label> Remember me</label>
            </div>
            <a href="#">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="btn bg-violet-800 text-white rounded-pill w-100 mt-4"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <h6 className="mt-3 text-center text-body-tertiary">Or sign up with</h6>
      </div>

      <div className="right-cover-pic">
        <img src="/images/signup-cover.png" alt="Signup Cover" />
        <h4>Discover amazing products</h4>
        <h5>Sign up to explore more</h5>
      </div>
    </div>
  </div>
  )
}

export default SignupPage