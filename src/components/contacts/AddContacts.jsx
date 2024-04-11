import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../services/ContactService";

const AddContacts = () => {

  let navigate = useNavigate();

  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      dob: "",
    },
    errMsg: "",
  });

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let { loading, contact, errMsg } = state;

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let res = await ContactService.createContact(state.contact);
      if (res) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (err) {
      setState({ ...state, errMsg: err.message });
      navigate("/contacts/add", { replace: false });
    }
  };

  return (
    <section>
      <div className="add-contact">
        <div className="container">
          <div className="py-3">
            <p className="h3 font-bold py-3">Create Contact</p>
            
          </div>
          <div className="flex items-start">
            <form onSubmit={submitForm} className="w-1/2">
              <div className="mb-2">
                <input
                  name="name"
                  value={contact.name}
                  onChange={updateInput}
                  required={true}
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="mb-2">
                <input
                  name="email"
                  value={contact.email}
                  onChange={updateInput}
                  type="email"
                  className="form-control"
                  placeholder="Email ID"
                />
              </div>
              <div className="mb-2">
                <input
                  name="mobile"
                  value={contact.mobile}
                  onChange={updateInput}
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                />
              </div>
              <div className="mb-2">
                <input
                  name="photo"
                  value={contact.photo}
                  onChange={updateInput}
                  type="tetx"
                  className="form-control"
                  placeholder="Photo URL"
                />
              </div>
              <div className="mb-2">
                <input
                  name="dob"
                  value={contact.dob}
                  onChange={updateInput}
                  type="date"
                  className="form-control"
                  placeholder="Date of Birth"
                />
              </div>
              <div className="mb-2">
                <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Create" />
                <Link to={"/contacts/add"} className="ms-2 inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded no-underline" > Cancel </Link></div>
            </form>
            <div className="w-1/2 h-full flex items-center justify-center">
              <img src={contact.photo} alt="" className="rounded-full p-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddContacts;
