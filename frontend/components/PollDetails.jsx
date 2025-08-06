import axios from 'axios'
import React from 'react'
import { getpolldetails, votefromuser } from '../services/backendapi'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'

const PollDetails = () => {
    const token = localStorage.getItem('authToken')
    const { id } = useParams();
    const [PollDetails, setPollDetails] = useState(null)

    const fetchpolldetails = async () => {
        try {
            const response = await axios.get(getpolldetails(id), {
                headers: {
                    Authorization: `${token}`
                }
            })
            setPollDetails(response.data.poll);
            console.log(response.data.poll);
        } catch (error) {
            console.log(error?.response?.data?.message || error)
        }
    }

    useEffect(() => {
        fetchpolldetails()
    }, [])

    const handelcandidateclick = async(c_id) => {
        try {
            const response = await axios.post(votefromuser(id),
            {candidateId : c_id},
            {
                headers : {
                    Authorization : `${token}`
                }
            })
            toast.success(response?.data?.message);
            fetchpolldetails();
        } catch (error) {
            toast.error(error?.response?.data?.message || error)
        }
    }


    return (
        <div className='flex justify-center items-center py-15'>
            {
                PollDetails ? (
                    <div className='bg-white max-w-2xl w-2xl p-10 rounded-xl shadow-xl'>
                        <div className='text-3xl font-bold text-blue-800 text-center mb-5'>
                            {PollDetails.title}
                        </div>
                        <div className='text-lg text-center text-gray-600 mb-5'>
                            {PollDetails.description}
                        </div>

                        {
                            PollDetails.status === "ended" && (
                                 <div className='text-xl font-semibold text-green-700 text-center mb-5'>
                                    🏆 Winner : {PollDetails.winner}
                                </div>
                            )
                        }
                        
                        <div className='flex flex-col gap-4'>
                            {
                                PollDetails.candidate.map((can,index)=>(
                                    <div key={index}
                                         onClick={() => handelcandidateclick(can._id)} 
                                         className=' bg-rose-200 hover:bg-white hover:border-gray-300 hover:border-2 rounded-md text-lg px-5 py-3 shadow-sm flex justify-between'>
                                    <div>
                                        {can.name}
                                    </div>
                                    <div>
                                        {can.votecount}
                                    </div>
                                    </div>
                                ))
                            } 
                        </div>
                    </div>
                ) :
                (
                    <div>Loading...</div>
                )
            }

        </div>
    )
}

export default PollDetails
