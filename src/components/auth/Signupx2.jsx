import React, { useEffect, useState } from 'react'
import { auth, provider } from './Configx2'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {signInWithPopup} from "firebase/auth"

const Signup = () => {

    let navigate = useNavigate();
    const [value, setValue] = useState('')

    const handleChange = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email)
            localStorage.setItem("email", data.user.email)
        })
    }

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    })

  return (
    <div>
        {value ?  navigate('/contacts/list') :
            <button onClick={handleClick}>sign in with Google</button>
        }
    </div>
  )
}

export default Signup
