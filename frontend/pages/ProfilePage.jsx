import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signout } from '../store/authSlice';
import EditdataForm from '../components/EditdataForm';
import { fetchuser, resetUser } from '../store/userSlice';

const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showform, setshowform] = useState(false)
  const [formMode, setFormMode] = useState(null);
  // fetchuser from backend

  const user = useSelector((state) => state.user.user)


  const handelsignout = () => {
    localStorage.removeItem("authToken")
    dispatch(signout());
    dispatch(resetUser())
    navigate("/")
  }

  const handleEditClick = (mode) => {
    setFormMode(mode);
    setshowform(true);
  };

  // after update data ko set karna padega data editform me se a rahe hai 
  // ye bata hai data update ho gaya hai redux update kar doo
  const handelupdateuser = () => {
    dispatch(fetchuser());
  }

  return (
    <>

      <div className='bg-white mx-auto my-10 w-xl h-auto p-4'>

        <div className='flex justify-center'>
          <div className="bg-blue-100 p-6 w-fit  rounded-full">
            <CgProfile className="text-blue-500 text-6xl" />
          </div>
        </div>

        <div className='flex flex-col gap-3 justify-center'>
          <div>
            <label htmlFor="">Name</label>
            <div className='mt-1 p-2 bg-gray-100 rounded-md border border-gray-300 text-gray-500'>
              {user?.name}
            </div>
          </div>
          <div>
            <label htmlFor="">Email</label>
            <div className='mt-1 p-2 bg-gray-100 rounded-md border border-gray-300 text-gray-500'>
              {user?.email}
            </div>
          </div>
          <div>
            <label htmlFor="">Number</label>
            <div className="mt-1 p-2 bg-gray-100 rounded-md border border-gray-300 text-gray-500 ">
              {user?.number}
            </div>
          </div>

          <div className='flex justify-around items-center gap-5 mt-5 '>
            <button className='bg-blue-600 text-blue-50 p-1.5 w-full rounded-xl'
              onClick={() => handleEditClick('profile')}
            >Edit Profile</button>
            <button className='bg-blue-600 text-blue-50 p-1.5 w-full rounded-xl'
              onClick={() => handleEditClick('password')}
            >Edit Password</button>
            {showform && <EditdataForm mode={formMode} user={user} onClose={() => setshowform(false)}
              onUpdate={handelupdateuser} />}
          </div>

          <div>
            <button onClick={handelsignout} className='bg-red-600 w-full p-2 rounded-xl text-white my-2'>
              Sign Out
            </button>
          </div>
        </div>

      </div>

    </>
  )
}

export default ProfilePage

