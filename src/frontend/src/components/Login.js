import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from 'jwt-decode';
import { login } from '../client.js';


//for custom button
import { Button } from 'antd';
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from 'axios';

const Login = () => {
    //for custom button
    // const login = useGoogleLogin({
    //   onSuccess: async tokenResponse => {
    //     const data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    //       header: {
    //         "Authorization": `Bearer ${tokenResponse.access_token}`
    //       }
    //     })
    //   }
    // })
    // const handleLogin = () => {
    //     window.location.href = {login};
    // };

    return (
        <div className="App">
             {/* <GoogleOAuthProvider
              clientId= '796161649848-evfehqk2d1kdb6hihflh6ps527soaub5.apps.googleusercontent.com'
              clientSecret= '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'
              redirectUri= 'http://localhost:3000/home'
              onLoginError={(error) => {
                console.log(error);
              }}
            >  */}
              /* for custom button */
              {/* <div style={{ textAlign: 'center' }}>
                <h1>Login Page</h1>
                <Button type="primary" onClick={login}>
                  Login with Google
                </Button>
              </div> */}

              /* google button */
              {/* /<GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log("success: ", credentialResponse);
                    const decoded = jwt_decode(credentialResponse.credential);
                    console.log("decoded token: ", decoded);
                    
                  }}
                
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  useOneTap
              /> */}

            {/* </GoogleOAuthProvider> */}
      </div>
    ) 
}
export default Login;