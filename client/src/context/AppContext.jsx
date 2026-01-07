import { createContext } from "react";
import axios from 'axios'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    const backendUrl = isProduction ? import.meta.env.VITE_BACKEND_URL : import.meta.env.VITE_BACKEND_URL
    const [thoughtData,setThoughtData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const getAuthState = async () => {
        try{
            const {data} = await axios.get(backendUrl+'/auth/is-auth');
            if(data.success){
                setIsLoggedIn(true);
                getUserData();
            }
        }catch(error){
            const message = error?.response?.data?.message || error?.message || 'Something went wrong';
            toast.error(message);
        }
    }

    const getUserData = async () => {
        try{
            const {data} = await axios.get(backendUrl+'/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message);
        }catch(error){
            toast.error(data.message);
        }
    }

    const getThoughtData = async () => {
        setLoading(true);
        try{
            const {data} = await axios.get(backendUrl+'/api/getthought')
            if(data.success) {
                setThoughtData(data.thoughts);
            } else {
                toast.error(data.error || 'Failed to fetch thoughts');
            }
        }catch(error){
            toast.error(error.message || 'Failed to fetch thoughts');
        } finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        getThoughtData();
        getAuthState();
    },[])

    const logout = async () => {
        try{
            const { data } = await axios.post(backendUrl+'/auth/logout');
            if(data.success){
                setIsLoggedIn(false);
                setUserData(null);
            }
        }catch(error){
            toast.error(error?.response?.data?.message || error.message);
        }
    }

    const value = {
        isLoggedIn,setIsLoggedIn,
        getUserData,
        setUserData,
        thoughtData,
        backendUrl,
        loading,
        userData,
        logout
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}