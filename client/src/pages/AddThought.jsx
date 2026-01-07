import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const AddThought = () => {
  const [mood, setMood] = useState("");
  const [thought, setThought] = useState("");
  const { backendUrl, refreshThoughts } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/addthought",
        { mood, thought }
      );

      if (data.success) {
        toast.success(data.message);
        setMood("");
        setThought("");
        // refresh list and redirect to home
        try { await refreshThoughts(); } catch (e) { /* ignore */ }
        navigate('/');
      } else {
        toast.error(data.message || "Failed to add thought");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-6 rounded-2xl shadow-md w-full max-w-md">

        {/* 🔙 Back Button (Mobile Friendly) */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
        >
          ← Back
        </button>

        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Write your thought 💭
        </h2>

        <input
          className="w-full border p-3 rounded-lg mb-3 text-base"
          placeholder="Mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />

        <textarea
          className="w-full border p-3 rounded-lg mb-4 text-base min-h-[120px] resize-none"
          placeholder="Your thought..."
          value={thought}
          onChange={(e) => setThought(e.target.value)}
        />

        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg hover:bg-indigo-700 active:scale-95 transition cursor-pointer">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddThought;
