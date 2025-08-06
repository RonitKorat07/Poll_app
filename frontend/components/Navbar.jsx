import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signout } from '../store/authSlice'
import { CgProfile } from "react-icons/cg";
import { fetchuser } from '../store/userSlice';


const Navbar = () => {
    const user = useSelector((state) => state.user.user)
    const role = useSelector(state => state.auth.role); // or wherever role is stored
    // console.log(user);

    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            dispatch(fetchuser());
        }
    }, [dispatch]);

    return (
        <>
            <nav className='bg-blue-300 flex justify-between items-center px-10 py-4 w-full sticky top-0 z-10'>
                        <h1 className="text-2xl font-bold text-white">Pollify</h1>

                <div >
                    <ul className='flex gap-10 text-xl'>
                        <li className='hover:text-blue-800 '>
                            <Link to="/">Home</Link>
                        </li>
                        <li className='hover:text-blue-800'>
                             <Link to={role === 'admin' ? "/adminpoll" : "/poll"}>
                                Poll
                            </Link>
                        </li>
                    </ul>
                </div>

                {user ? (
                    <div>
                        {/* <button className='bg-purple-100 font-bold px-4 py-1 rounded-xl'
                                onClick={handelsignout}>
                            Sign Out
                        </button> */}
                        <Link to={"/profile"}>
                            <div className='flex gap-3 bg-blue-100 rounded-sm py-1 px-4'>
                                <CgProfile className='text-2xl text-blue-600' />
                                <span className='uppercase text-blue-600 font-bold'>{user.name}</span>
                            </div>
                        </Link>

                    </div>
                ) : (
                    <div>
                        <Link to={"/signin"} >
                            <button className='bg-purple-100 font-bold px-4 py-1 rounded-xl'>
                                Sign In
                            </button>
                        </Link>
                    </div>
                )}
            </nav>

        </>
    )
}

export default Navbar
