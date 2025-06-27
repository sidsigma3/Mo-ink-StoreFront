import { GoogleLogin } from '@react-oauth/google';

<GoogleLogin
  onSuccess={(credentialResponse) => {
    console.log(credentialResponse.credential); // JWT token
    // Optional: send to backend
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap={false}
  theme="filled_black"
  text="signin_with"
  shape="circle"
/>
