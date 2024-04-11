import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../services/ContactService";
import ReactCardFlip from 'react-card-flip';

const ContactList = () => {
  const [query, setQuery] = useState({ text: "" });
  const [flippedCardIndex, setFlippedCardIndex] = useState(null);

  const flip = (index) => {
    setFlippedCardIndex(index === flippedCardIndex ? null : index);
  };

  const searchContact = (event) => {
    setQuery({ ...query, text: event.target.value });
    const filteredContacts = state.contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setState({ ...state, filteredContacts });
  };

  const [state, setState] = useState({
    contacts: [],
    filteredContacts: [],
    errorMessage: "",
  });

  useEffect(async () => {
    try {
      const res = await ContactService.getAllContact();
      setState({ ...state, contacts: res.data, filteredContacts: res.data });
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
  }, []);

  const clickDelete = async (contactId) => {
    try {
      const res = await ContactService.deleteContact(contactId);
      if (res) {
        const res = await ContactService.getAllContact();
        setState({ ...state, contacts: res.data, filteredContacts: res.data });
      }
    } catch (error) {}
  };

  const { filteredContacts } = state;

  return (
    <div className="container">
      <section className="p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="h3 flex items-center">
              Contact Manager
              <Link to={"/contacts/add"} className="btn btn-primary mx-2">
                <i className="fa fa-plus-circle mx-2" />
                Add Contact
              </Link>
            </p>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <form>
              <div className="mb-2">
                <input
                  name="text"
                  value={query.text}
                  onChange={searchContact}
                  type="text"
                  className="form-control"
                  placeholder="Search Name"
                />
              </div>
            </form>
          </div>
          {filteredContacts.map((contact, index) => (
            <div className="col-span-1 sm:col-span-2 lg:col-span-1" key={contact.id}>
              <ReactCardFlip flipDirection="vertical" isFlipped={flippedCardIndex === index}>
                <div className="card" onClick={() => flip(index)}>
                  <div className="p-2">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                        <img
                          src={contact.photo}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="text-center">
                        <span className="font-bold">{contact.name}</span>
                      </div>
                      <div className="flex justify-center gap-4 mt-4">
                        <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning">
                          <i className="fa fa-eye" />
                        </Link>
                        <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary">
                          <i className="fa fa-pen" />
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => clickDelete(contact.id)}
                        >
                          <i className="fa fa-trash" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-back" onClick={() => flip(index)}>
                  <section className="mt-3">
                    <div>
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
                    </div>
                  </section>
                </div>
              </ReactCardFlip>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactList;
