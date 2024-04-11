import React from "react";
import ReactDOM from "react-dom"
import App from "./App.js";
import "./index.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = "736303862328-v524t858pcuj8f9h4om7lrcomfn59sdr.apps.googleusercontent.com";

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById("root"));