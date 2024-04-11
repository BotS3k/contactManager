import { GoogleLogin } from "react-google-login"

const clientId = "736303862328-v524t858pcuj8f9h4om7lrcomfn59sdr.apps.googleusercontent.com"

const Login = () => {

    const onSuccess = (res) => {
        console.log('LOGIN SUCCESS! Current user:', res.profileObj);
      };
      
      const onFailure = (res) => {
        console.log('LOGIN FAILED! res:', res);
      };      

    return (
        <div id="signInButton">
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        </div>
    )
}


export default Login;