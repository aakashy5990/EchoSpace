import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, setUserData} = useContext(AppContext);

  const [state, setState] = useState('Signup');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        axios.defaults.withCredentials = true;

        if(state === 'Signup'){
            const {data} = await axios.post(backendUrl+'/auth/register', {username,password})

            if(data.success){
                setIsLoggedIn(true);
                setUserData(data.username);
                navigate('/');
            }else{
                toast.error(data.message);
            }
        }else{
            const {data} = await axios.post(backendUrl+'/auth/login',{username,password})   

            if(data.success){
                setIsLoggedIn(true);
                setUserData(data.username);
                navigate('/');
            }else{
                toast.error(data.message);
            }
        }
    }catch(error) {
      const message = error?.response?.data?.message || error?.message || 'Something went wrong';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        {state === 'Signup' ? (<h2 className="text-xl font-bold text-center mb-4">
          Register
        </h2>) : (<h2 className="text-xl font-bold text-center mb-4">
          Login
        </h2>)}
        

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
        >
          {state}
        </button>

        {state === 'Signup' ? (<p className='text-gray-400 text-center text-xs mt-4'>Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline'>Login here</span>
          </p>) : (<p className='text-gray-400 text-center text-xs mt-4'>Don't have an account?{' '}
            <span onClick={() => setState('Signup')} className='text-blue-400 cursor-pointer underline'>Signup</span>
          </p>)}

      </form>
    </div>
  );
};

export default Login;
