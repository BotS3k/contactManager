import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../services/ContactService";
import { RingLoader } from "react-spinners";

const ViewContacts = () => {
  let { contactId } = useParams();

  let [state, setState] = useState({
    contact: {},
    errMsg: "",
  });

  useEffect(async () => {
    try {
      setState({ ...state});
      let res = await ContactService.getContact(contactId);
      setState({
        ...state,
        contact: res.data,
      });
    } catch (err) {
      setState({
        ...state,
        errMsg: err.message,
      });
    }
  }, [contactId]);

  let { contact, errMsg } = state;

  return (
    <div>
      <section className="view=contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 py-3">View Contact</p>
            </div>
          </div>
        </div>
      </section>

      {(
        <div>
          {Object.keys(contact).length > 0 && (
            <section className="mt-3">
            <div className="container">
              <div className="flex">
                <div className="w-1/2 flex items-center justify-center">
                  <img src={contact.photo} alt="" className="rounded-full" />
                </div>
                <div className="w-1/2">
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                      Name: <span className="font-bold">{contact.name}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Number: <span className="font-bold">{contact.mobile}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Email: <span className="font-bold">{contact.email}</span>
                    </li>
                  </ul>
                  <div className="mt-3">
                    <Link to={"/contacts/list"} className="text-blue-500 hover:text-blue-700">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          )}
        </div>
      )}
    </div>
  );
};

export default ViewContacts;
