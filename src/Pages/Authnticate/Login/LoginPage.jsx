import React ,{useState} from 'react'
import "./LoginPage.css"
import ToggleBtn from '../../../Components/Buttons/ToggleButton/ToggleBtn'
import { useNavigate } from 'react-router-dom'
import { loginCustomer } from '../../../Services/CustomerService'

const LoginPage = ({ togglePage ,isLogin, setAuthStatus }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async () => {
        const response = await loginCustomer(username, password);
        if (response.success) {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userData", JSON.stringify(response.data));
        //   setAuthStatus(true);
          navigate("/");
        } else {
          setError(response.message);
        }
      };

  return (
    <div className='login-page'>
    <div className='login-page-ctn'>
    
        <div className='logo-ctn'>
            <img src='/images/logo.png'></img>
        </div>

        <div className='left-cover-pic'>
            <img src='/images/login-cover.png'></img>
            <h4>Lorem ipsum dolor sit.</h4>
            <h5>Lorem ipsum dolor sit.</h5>
        </div>

        <div className='right-ctn'>
            <h6 className='welcome'>Welocme to Moink & dyes </h6>
               <ToggleBtn click={togglePage} status={!isLogin}></ToggleBtn>


                <h6 className='mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae minus optio voluptates!</h6>


                <div className="d-flex flex-column gap-2 mt-5">
                    <label>Username</label>
                    <input
                    className="login-input rounded-pill"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="d-flex flex-column gap-2 mt-4">
                    <label>Password</label>
                    <input
                    type="password"
                    className="login-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>


                <div className='d-flex justify-content-between mt-3'>
                    <div className='d-flex gap-2'>
                        <input type='checkbox'></input>
                        <label> Remember me</label>
                    </div>
                
                    <a href="/forgotPassword">Forgot password?</a>
                
                
                </div>


                <button  className='btn bg-violet-800 text-white rounded-pill w-100 mt-4'  onClick={handleLogin}>Login</button>

                <h6 className='mt-3 text-center text-body-tertiary'>Or login with</h6>


                <div>
                    
                </div>
                
        </div>

    </div>
    </div>
  )
}

export default LoginPage