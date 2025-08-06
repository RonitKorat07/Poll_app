import axios from 'axios';
import React, { useState } from 'react';
import { MdCancel } from "react-icons/md";
import { addpoll } from '../services/backendapi';
import toast from 'react-hot-toast';


const AddPollForm = ({ onClose , fetchpoll }) => {
  const [formData, setformData] = useState({
    title : "",
    description : "",
    candidate : [{name : ""} , {name : ""}]
  })

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    
    if (name === 'title' || name === 'description') {
      setformData({
        ...formData,
        [name]: value,
      });
    } else if (name === 'candidate') {
      const updatedCandidate = formData.candidate.map((candidate, i) => 
        i === index ? { ...candidate, name: value } : candidate
      );
      setformData({
        ...formData,
        candidate: updatedCandidate
      });
    }
  };

  const handleAddCandidate = () => {
      setformData({
        ...formData,
        candidate : [...formData.candidate , {name : ""}]
      })
  }

  const handelFormSubmit = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken")

      console.log('formData before submitting:', formData);

    try {
        const response = await axios.post(addpoll, formData ,{
          headers : {
            Authorization : `${token}`
          }
        })
        toast.success(response.data.message)
        fetchpoll()
        onClose()
      } catch (error) {
        console.log('error', error)
      }
    console.log('formData', formData)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-xl relative">
        <h2 className="text-2xl font-semibold text-center mb-4">Create New Poll</h2>
            <button onClick={onClose} className='absolute top-1 right-1 cursor-pointer'>
                <MdCancel className='text-2xl text-red-600'/>
            </button>

        <form onSubmit={handelFormSubmit} className='space-y-4'>
            <input type="text"
                   placeholder='Enter Title... '
                   className='w-full border rounded p-2'
                   name='title'
                   value={formData.title}
                   onChange={handleChange}
                   required
                   
            />

           <textarea 
                    id="" rows={3}
                    placeholder='Enter Description Here...'
                    className='w-full border rounded p-2'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    required
           />

          <div>
            <label htmlFor="">Candidate</label>
            {
              formData.candidate.map((can , index) => (
                <div key={index} > 
                    <input type="text" 
                          className='w-full border rounded p-2 mb-2'
                           placeholder={`Candidate ${index + 1}`}
                           name="candidate"
                           value={can.name}
                           onChange={(e) => handleChange(e, index)}
                           required
                      />
                </div>
              ))
            }

          {formData.candidate.length < 5 && (
            <button  
            className="text-blue-600 hover:text-blue-900 border-b-2 border-blue-600 hover:border-blue-800 font-semibold text-sm"
            type="button" onClick={handleAddCandidate}>Add More Candidate</button>
          )}
          </div>
            
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Create Poll
          </button>

        </form>

      </div>
    </div>
  );
};

export default AddPollForm;


