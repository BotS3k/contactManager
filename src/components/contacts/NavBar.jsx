  import React from 'react'
  import { Link } from 'react-router-dom'

  const NavBar = () => {
    return (
      <div className='w-screen p-3 bg-gradient-to-r from-[#002D62] to-[#0000FF]'>
        <nav className='flex'>
          <div className=''>
              <Link to={'/'} className='text-white no-underline text-lg'>Contact Manager</Link>
          </div>
        </nav>
      </div>
    )
  }

  export default NavBar
