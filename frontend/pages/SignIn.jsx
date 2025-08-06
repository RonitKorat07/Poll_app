import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 👈 import Link
import { useDispatch } from 'react-redux';
import { signinuser, signupuser } from '../store/authSlice';
import toast from 'react-hot-toast';
import { fetchuser } from '../store/userSlice';

const SignIn = () => {

  const [formdata, setformdata] = useState({
    email : "",
    password : ""
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      const response = await dispatch(signinuser(formdata)).unwrap();
      toast.success("Login successful!");
      // console.log(response);

      await dispatch(fetchuser());
      if(response.role === "admin"){
        navigate("/adminpoll")
      }else{
        navigate("/poll")
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handelonsubmit} className='flex justify-center h-screen'>
        <div className='flex bg-blue-100 rounded-xl flex-col justify-center gap-2 w-xl m-auto p-10'>

          <div className='text-2xl text-center my-5'>
            Sign In
          </div>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={handelonchange}
            className='border-1 rounded-sm p-1'
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name= "password"
            value={formdata.password}
            onChange={handelonchange}
            className='border-1 rounded-sm p-1'
            required
          />

          <button className='bg-pink-400 p-2 rounded-sm my-4'>Sign In</button>

          {/* 👇 Add this line for Sign Up link */}
          <div className='text-center'>
            Don't have an account?{" "}
            <Link to="/signup" className='text-blue-600 underline'>
              Sign Up
            </Link>
          </div>

        </div>
      </form>
    </>
  );
};

export default SignIn;
