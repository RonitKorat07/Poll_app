import axios from 'axios'

const userapi = import.meta.env.VITE_API_BASE_URL_USER;
const pollapi = import.meta.env.VITE_API_BASE_URL_POLL;

// sign up 

export const signup = `${userapi}/signup`;
export const signin = `${userapi}/signin`;
export const profile = `${userapi}/profile`;
export const changeprofiledata = `${userapi}/profile/data`;
export const changepassword = `${userapi}/profile/password`;

export const getallpoll = `${pollapi}/allpoll`;
export const getpolldetails = (id) =>  `${pollapi}/allpoll/${id}`;
export const votefromuser = (id) =>  `${pollapi}/${id}/vote`;

export const deletepoll = (id) =>  `${pollapi}/delete/${id}/`;
export const endpoll = (id) =>  `${pollapi}/update/${id}/`;
export const addpoll = `${pollapi}/createpoll`;

