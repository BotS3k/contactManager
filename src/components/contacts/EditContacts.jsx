import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ContactService } from '../../services/ContactService';

const EditContacts = () => {
  let { contactId } = useParams();
  let navigate = useNavigate();

  let [state, setState] = useState({
    contact: {
      name: '',
      mobile: '',
      photo: '',
      email: '',
      dob: ''
    },
    errMsg: '',
  });

  useEffect(() => {
    const fetchContact = async () => { 
      try {
        let res = await ContactService.getContact(contactId);
        setState((prevState) => ({ ...prevState, contact: res.data })); 
      } catch (err) {
        setState((prevState) => ({ ...prevState, errMsg: err.message })); 
      }
    };
    fetchContact(); 
  }, [contactId]);

  const updateInput = (event) => {
    setState((prevState) => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        [event.target.name]: event.target.value
      }
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault(); 
    try {
      let res = await ContactService.updateContact(state.contact, contactId);
      if (res) {
        navigate('/contacts/list', { replace: true });
      }
    } catch (err) {
      setState((prevState) => ({ ...prevState, errMsg: err.message })); 
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };

  let { contact, errMsg } = state;

  return (
    <div>
      <section>
        <div className='add-contact'>
          <div className="container">
            <div className="row">
              <div className="col">
                <p className='h3 font-bold py-3'>Edit Contact</p>
              </div>
            </div>
            <div className='row'>
              <div className="col-md-6">
                <form onSubmit={submitForm}> 
                  <div className="mb-2">
                    <input required={true} value={contact.name} onChange={updateInput} name="name" type="text" className='form-control' placeholder='Name' />
                  </div>
                  <div className='mb-2'>
                    <input value={contact.email} onChange={updateInput} name="email" type="email" className='form-control' placeholder='Email ID' />
                  </div>
                  <div className='mb-2'>
                    <input value={contact.mobile} onChange={updateInput} name="mobile" type="text" className='form-control' placeholder='Phone Number' />
                  </div>
                  <div className='mb-2'>
                    <input value={contact.dob} onChange={updateInput} name="dob" type="date" className='form-control' placeholder='Date of Birth' />
                  </div>
                  <div className='mb-2'>
                    <input type="submit" className='btn btn-primary' value="Update" /> 
                    <Link to={'/contacts/list'} className='ms-2 btn btn-secondary'>Cancel</Link>
                  </div>
                </form>
              </div>
              <div className='col-md-6'>
                <img src={contact.photo} alt="Contact" className='img-fluid py-3' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditContacts;
