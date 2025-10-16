// src/Pages/Purchase/Purchase.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { COURSES } from "../../data/courses";

export default function Purchase() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Select a Course to Buy</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {COURSES.map((c) => (
          <div key={c.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.description}</p>
            <p className="mt-2 font-bold">${c.price}</p>
            <button
              onClick={() => navigate(`/purchase/checkout/${c.id}`)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
