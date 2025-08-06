import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signupuser } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

const SignUp = () => {
  const [formdata, setformdata] = useState({
    name : "",
    email : "",
    password : "",
    number : ""
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelonchange = (e) => {
    const {name , value} = e.target
    setformdata(prev => ({
      ...prev, 
      [name] : value
    }))
  }

  const handelonsubmit = async (e) => {
    e.preventDefault();
    
    try {
       await dispatch(signupuser(formdata)).unwrap()
       navigate("/signin");
       toast.success("Sign Up SuccessFully")
     } catch (error) {
       toast.error(error);  // 🟢 Show error message
    }
  }
  return (
    <>
    
      <form onSubmit={handelonsubmit} className='flex justify-center h-screen'>
      <div className='flex bg-blue-100 rounded-xl flex-col justify-center gap-2 w-xl m-auto p-10'>
     
      <div className='text-2xl text-center my-5'>
        Sign Up
      </div>

      <label htmlFor="name">Name</label>
      <input type="text" 
            name="name"
            value={formdata.name}
            onChange={handelonchange}
            required
            className=' border-1 rounded-sm p-1'
      />

      <label htmlFor="email">Email</label>
      <input type="email"
              name="email"
              value={formdata.email}
              onChange={handelonchange}
              required
            className=' border-1 rounded-sm p-1'
      />

      <label htmlFor="password">Password</label>
      <input type="password"
              name="password"
              value={formdata.password}
              onChange={handelonchange}
              required
            className=' border-1 rounded-sm p-1'
      />

      <label htmlFor="number">Number</label>
      <input type="number"
            name="number"
            value={formdata.number}
            onChange={handelonchange}
            required
            className=' border-1 rounded-sm p-1'
      />
     
      <button className='bg-pink-400 p-2 rounded-sm my-4'>Sign Up</button>

          <div className='text-center'>
            Already have an account? {" "}
            <Link to="/signin" className='text-blue-600 underline'>
               Sign In
            </Link>
          </div>
      </div>
      </form>

    </>
  )
}

export default SignUp
