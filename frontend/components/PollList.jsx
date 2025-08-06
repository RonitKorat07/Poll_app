import axios from 'axios'
import { deletepoll, endpoll, getallpoll } from '../services/backendapi'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import AddPollForm from './AddPollForm'


const PollList = () => {
    const [polldata, setpolldata] = useState(null)
    const [formshow, setformshow] = useState(false)
    const token = localStorage.getItem('authToken')
    const navigate = useNavigate()

    const userRole = useSelector((state) => state.auth.role)

    const fetchpoll = async () => {
        try {
            const response = await axios.get(getallpoll, {
                headers: {
                    Authorization: `${token}`
                }
            })
            console.log(response);

            setpolldata(response.data.polls);
        } catch (error) {
            console.log(error?.response?.data?.message || error)
        }
    }

    const handlePollClick = (id) => {
        if(userRole == 'admin'){
            navigate(`/adminpoll/${id}`); // navigate to detail page with poll id
        }else{
        navigate(`/poll/${id}`);
        } // navigate to detail page with poll id
    };

    const handelpolldele = async(id) => {
        try {
            const res = await axios.delete(deletepoll(id),{
                headers: {
                    Authorization : `${token}`
                }
            })
            // console.log(res);
            toast.success(res.data.message)
            fetchpoll()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handelpollend = async(id) => {
        try {
            const res = await axios.put(endpoll(id),{
                "status" : "ended"
            },{
                  headers: {
                    Authorization : `${token}`
                }
            })
            console.log(res);
            toast.success(res.data.message)
            fetchpoll()
        } catch (error) {
            toast.error(error.message)

        }
    }

     useEffect(() => {
        fetchpoll()
    }, [])

    return (
        <div>
            {userRole === 'admin' && (
                <div className="flex justify-center w-full mt-10">
                    <button
                        onClick={() => setformshow(true)} 
                        className="px-10 py-2 text-lg bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Add New Poll
                    </button>

                    {formshow && (
                        <AddPollForm onClose={() => setformshow(false)}  fetchpoll={fetchpoll}/>
                    )}

                </div>
            )}

            <div className='flex flex-col items-center gap-5 py-10'>
                {
                    polldata?.length > 0 ? (
                      [...polldata].reverse().map((poll) => (
                            <div
                                key={poll._id}
                                onClick={() => handlePollClick(poll._id)}
                                className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 relative">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-semibold text-gray-900">{poll.title}</h2>
                                    <span className={`text-sm font-medium px-3 py-1 rounded-full
                                                    ${poll.status == 'active' ? 'bg-green-100 text-green-700' : 'bg-red-400 text-white'}`}>
                                        {poll.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-base">{poll.description}</p>

                                {userRole === 'admin' && (
                                    <div className='flex gap-2'>
                                        <button className="px-2 py-1 mt-3 text-sm bg-blue-600 text-white rounded-md"

                                               onClick={(e) =>{ 
                                                        e.stopPropagation();
                                                        handelpollend(poll._id)
                                                    }}>
                                            End
                                        </button>

                                        <button className='px-2 py-1 mt-3 text-sm bg-red-600 text-white rounded-md'
                                                    onClick={(e) =>{ 
                                                        e.stopPropagation();
                                                        handelpolldele(poll._id)
                                                    }}>                                                
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>No Polls Available</div>
                    )
                }
            </div>

        </div>
    )
}

export default PollList
