import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { COURSES } from "../../data/courses";

const PaymentForm = () => {
  const { id } = useParams();
  const course = COURSES.find((c) => c.id === id);

  const [form, setForm] = useState({ name: "", email: "" });
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // अभी payment gateway नहीं जोड़ा, सीधे success दिखा देंगे
    setSuccess(true);
  }

  if (!course) return <div>Course not found</div>;

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow">
      {success ? (
        // ✅ Success message
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">
            ✅ Payment Successful
          </h2>
          <p className="mt-2">
            Thank you for your purchase of <b>{course.title}</b>!
          </p>
          <button
            onClick={() => (window.location.href = "/purchase")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Back to Courses
          </button>
        </div>
      ) : (
        // 🧾 Payment form
        <>
          <h2 className="text-xl font-bold mb-4">Checkout - {course.title}</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-3">
              Name:
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </label>

            <label className="block mb-3">
              Email:
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </label>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Pay ${course.price}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PaymentForm;
