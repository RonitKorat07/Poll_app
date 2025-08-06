import axios from "axios";
import { useEffect, useState } from "react";
import { changepassword, changeprofiledata } from "../services/backendapi";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
const EditdataForm = ({ mode, user, onClose , onUpdate }) => {

    const [profiledata, setprofiledata] = useState({
        name: "",
        email: "",
        number: ""
    })

    const [passworddata, setpassworddata] = useState({
        oldPass: "",
        newPass: ""
    });

    const token = localStorage.getItem("authToken")
    console.log(token);
    
    useEffect(() => {
        if (user && mode === "profile") {
            setprofiledata({
                name: user.name || "",
                email: user.email || "",
                number: user.number || ""
            });
        }
    }, [user, mode]);


    

    const handelonchange = (e) => {
        const { name, value } = e.target;

        if (mode === 'profile') {
            setprofiledata((prev) => ({
                ...prev,
                [name]: value
            }))
        } else {
            setpassworddata((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handelonclick = async (e) => {
        e.preventDefault();
        if (mode === "profile") {
            try {
                const response = await axios.put(changeprofiledata, profiledata ,{
                    headers: {
                        Authorization: `${token}`
                    }
                })
                toast.success("Profile Data Updated")
                 onUpdate(response.data.user)
                // onUpdate(response.data);
                onClose();
            } catch (error) {
                toast.error(error?.response?.data?.messag || error.messag)
            }
        }else {
            try {
                const response = await axios.put(changepassword, passworddata 
                    ,{
                    headers: {
                        Authorization: `${token}`
                    }
                }
            )
                toast.success("Profile Password Updated")
                onClose();
            } catch (error) {
                toast.error(error?.response?.data?.message || error.messag)
            }
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white w-md h-96 max-w-xl p-6 rounded-lg shadow-lg flex flex-col justify-center  relative">
                <button onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 text-3xl cursor-pointer">
                         <MdCancel className='text-2xl text-red-600'/>
                    </button>

                {mode === 'profile' && (
                    <>
                        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                        <label htmlFor="" className='mb-1'>Name</label>
                        <input className="w-full mb-3 p-2 border rounded"
                            name="name"
                            value={profiledata?.name}
                            onChange={handelonchange}
                            placeholder="Name" />

                        <label htmlFor="" className='mb-1'>Email</label>
                        <input className="w-full mb-3 p-2 border rounded"
                            name="email"
                            value={profiledata?.email}
                            onChange={handelonchange}
                            placeholder="Email" />

                        <label htmlFor="" className='mb-1'>Number</label>
                        <input className="w-full mb-3 p-2 border rounded"
                            value={profiledata?.number}
                            name="number"
                            onChange={handelonchange}
                            placeholder="Phone" />
                    </>
                )}

                {mode === 'password' && (
                    <>
                        <h2 className="text-xl font-bold mb-4">Change Password</h2>
                        <label htmlFor="" className='mb-1'>Old Password</label>
                        <input className="w-full mb-3 p-2 border rounded"
                            type="password"
                            placeholder="Old Password"
                            name="oldPass"
                            value={passworddata.oldPass}
                            onChange={handelonchange}
                        />
                        <label htmlFor="" className='mb-1'>New Password</label>
                        <input className="w-full mb-3 p-2 border rounded"
                            type="password"
                            placeholder="Confirm Password"
                            name="newPass"
                            value={passworddata.newPass}
                            onChange={handelonchange} />
                    </>
                )}

                <button onClick={handelonclick} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
        </div>
    );
};

export default EditdataForm;
