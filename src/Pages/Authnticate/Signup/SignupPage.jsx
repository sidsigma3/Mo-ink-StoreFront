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
          company: formData.company || null,
          gstNumber: formData.gstNumber || null,
          customerAddress:"",
          addresses: [
            {
                customerAddress: "",
                street: "",
                city: "",
                state: "",
                country: "",
                zipcode: "",
                addressType: "HOME",
            },
        ],

        //   panNumber: formData.panNumber || null,
        //   cancelledCheque: formData.cancelledCheque || null,
          customerStatus: "ACTIVE",
        };
      
        try {
          const response = await createCustomer(customerData);
          alert("Account created successfully!");
          console.log("Customer Created:", response);
          e.target.reset()
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
      <div className="logo-ctn p-3">
        <img src="/images/logo.png" alt="Logo" />
      </div>

      <div className="left-ctn">
        <h6 className="welcome font-bold">Welcome to Moink & Dyes</h6>
        <ToggleBtn click={togglePage} status={!isLogin} />

        {/* <h6 className="mt-2 text-center font-semibold">Create your account to get started</h6> */}

        <form onSubmit={handleSubmit} className='register-inputs'>
          <div className="flex flex-col flex-row justify-between mt-4 gap-3">
            <div className="d-flex flex-column flex-1">
              <label className='font-semibold'>First Name</label>
              <input
                className="login-input rounded-pill"
                placeholder="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={{fontSize:"14px"}}
                required
              />
            </div>

            <div className="d-flex flex-column flex-1">
              <label className='font-semibold'>Last Name</label>
              <input
                className="login-input rounded-pill"
                placeholder="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={{fontSize:"14px"}}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-3 gap-3">
          <div className="d-flex flex-column flex-1">
            <label className='font-semibold'>Email</label>
            <input
              className="login-input rounded-pill"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{fontSize:"14px"}}
            />
          </div>

          <div className="d-flex flex-column flex-1">
            <label className='font-semibold'>Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{fontSize:"14px"}}
            />
          </div>
</div>
          <div className="flex flex-col flex-row justify-between mt-3 gap-3">
            <div className="d-flex flex-column flex-1">
              <label className='font-semibold'>Phone</label>
              <input
                className="login-input rounded-pill"
                placeholder="Phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                style={{fontSize:"14px"}}
              />
            </div>

            <div className="d-flex flex-column flex-1">
              <label className='font-semibold'>WhatsApp</label>
              <input
                className="login-input rounded-pill"
                placeholder="WhatsApp number"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                style={{fontSize:"14px"}}
              />
            </div>
          </div>

          <div className="flex flex-col flex-row justify-between mt-3 gap-3">
            <div className="d-flex flex-column flex-1">
              <label className='font-semibold'>Company</label>
              <input
                className="login-input rounded-pill"
                placeholder="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                style={{fontSize:"14px"}}
              />
            </div>

            <div className="d-flex flex-column flex-1">
              <label className='font-semibold'>GST Number</label>
              <input
                className="login-input rounded-pill"
                placeholder="GST number"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                style={{fontSize:"14px"}}
              />
            </div>
          </div>

          {/* <div className="d-flex flex-column gap-2 mt-4">
            <label>Address</label>
            <input
              className="login-input rounded-pill"
              placeholder=" address"
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column gap-2 mt-4">
            <label>City</label>
            <input
              className="login-input rounded-pill"
              placeholder=" city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column gap-2 mt-4">
            <label>State</label>
            <input
              className="login-input rounded-pill"
              placeholder=" state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column gap-2 mt-4">
            <label>Country</label>
            <input
              className="login-input rounded-pill"
              placeholder=" country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column gap-2 mt-4">
            <label>Zip Code</label>
            <input
              className="login-input rounded-pill"
              placeholder=" zip code"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />
          </div> */}

          {/* <div className="d-flex justify-content-between mt-1">
            <div className="d-flex gap-1">
              <input type="checkbox" />
              <label className='font-semibold'>Remember me?</label>
            </div>
            <a href="#" className='font-semibold forgot'>Forgot password?</a>
          </div> */}

          <div className='d-flex justify-center items-center'>
          <button
            type="submit"
            className="btn bg-violet-800 rounded-pill mt-5 font-bold register"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
          </div>
        </form>

        {/* <h6 className="mt-3 text-center text-body-tertiary">Or sign up with</h6> */}
      </div>

      <div className="right-cover-pic hidden md:block">
        {/* <img src="/images/signup-cover.png" alt="Signup Cover" /> */}
        {/* <h4>Discover amazing products</h4>
        <h5>Sign up to explore more</h5> */}
      </div>
    </div>
  </div>
  )
}

export default SignupPage