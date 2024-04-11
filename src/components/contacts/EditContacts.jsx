import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ContactService } from '../../services/ContactService'
import { RingLoader } from "react-spinners";


const EditContacts = () => {

  let {contactId} = useParams()

  let navigate = useNavigate();

  let [state, setState] = useState({
    contact:{
        name: '',
        mobile:'',
        photo:'',
        email:'',
        dob:''
    },
    errMsg:'',
  })

  useEffect( async () => {
    try {
        setState({...state});
        let res = await ContactService.getContact(contactId)
        setState({...state, contact: res.data})
    } catch (err) {
        setState({...state, errMsg: err.message})
    }
  }, [contactId]);

  const updateInput = (event) => {
    setState({
        ...state,
        contact: {
            ...state.contact, 
            [event.target.name]: event.target.value
        }
    });
    };
  let submitForm = async(event) => {
    event.preventDefault();
    try {
        let res = await ContactService.updateContact(state.contact, contactId   );
        if(res){
            navigate('/contacts/list', {replace:true});
        }
    } catch (err) {
        setState({...state, errMsg: err.message});
        navigate(`/contacts/edit/${contactId}`, {replace: false});
    }

  }

  let {contact, errMsg} = state;
  
  return (<div>
   {
    
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
                                <input required={true} value ={contact.name} onChange={updateInput} name="name" type="text" className='form-control' placeholder='Name'/>
                            </div>
                            <div className='mb-2'>
                                <input value ={contact.email} onChange={updateInput} name="email" type="email" className='form-control' placeholder='Email ID'/>
                            </div>
                            <div className='mb-2'>
                                <input value ={contact.mobile} onChange={updateInput} name="mobile" type="text" className='form-control' placeholder='Phone Number'/>
                            </div>
                            <div className='mb-2'>
                                <input value ={contact.dob} onChange={updateInput} name="dob" type="date" className='form-control' placeholder='Date of Birth'/>
                            </div>
                            
                        </form>
                    </div>
                    <div className='col-md-6 w-full'>
                        <img src={contact.photo} alt="" className='flex justify-center items-center py-3' />
                    </div>
                    <div className='mb-2'>
                        <input type="submit" className='' value="Update"/>
                        <Link to={'/contacts/add'} className='ms-2'>Cancel</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
   }
    </div>
  )
}

export default EditContacts
