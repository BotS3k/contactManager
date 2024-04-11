import { GoogleLogout } from "react-google-login";
const clientId =
  "736303862328-v524t858pcuj8f9h4om7lrcomfn59sdr.apps.googleusercontent.com";

const Logout = () => {
const onSuccess = () => console.log(" Logout successful");

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;
