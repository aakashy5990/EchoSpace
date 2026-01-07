import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { thoughtData, loading, isLoggedIn, userData, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 px-4 py-6">

      {/* Navigation Header */}
      <nav className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center bg-white/80 backdrop-blur rounded-2xl p-4 shadow-md">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-700">EchoSpace</h1>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-indigo-600 font-semibold">
                  Welcome, {userData}! 👋
                </span>
                <button
                  onClick={() => navigate('/add-thought')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium cursor-pointer"
                >
                  ✍️ Add Thought
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-medium cursor-pointer"
              >
                Login/Register
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-xl mx-auto mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700">
            Thoughts of the Day
        </h2>
      </div>

      {/* Thoughts */}
      <div className="max-w-xl mx-auto space-y-4 pb-24">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
          </div>
        ) : thoughtData.length > 0 ? (
          thoughtData.map((item) => (
            <div
              key={item._id}
              className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-indigo-600 font-semibold text-sm">
                  {item.mood}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
                </span>
              </div>

              <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
                {item.thought}
              </p>
            </div>
          ))
        ) : ( 
          <p className="text-center text-gray-500 mt-20">
            No thoughts yet ✨ <br />
            Write your first thought 💭
          </p>
        )}
      </div>

      {/* Floating Add Button (Mobile Friendly) */}
      <button
        onClick={() => navigate("/add-thought")}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-indigo-700 active:scale-95 transition cursor-pointer"
      >
        + Add
      </button>
    </div>
  );
};

export default Home;
